const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TicketsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tickets = await db.tickets.create(
      {
        id: data.id || undefined,

        event_name: data.event_name || null,
        event_date: data.event_date || null,
        price: data.price || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tickets.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    await tickets.setPurchases(data.purchases || [], {
      transaction,
    });

    return tickets;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const ticketsData = data.map((item, index) => ({
      id: item.id || undefined,

      event_name: item.event_name || null,
      event_date: item.event_date || null,
      price: item.price || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const tickets = await db.tickets.bulkCreate(ticketsData, { transaction });

    // For each item created, replace relation files

    return tickets;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const tickets = await db.tickets.findByPk(id, {}, { transaction });

    await tickets.update(
      {
        event_name: data.event_name || null,
        event_date: data.event_date || null,
        price: data.price || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tickets.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    await tickets.setPurchases(data.purchases || [], {
      transaction,
    });

    return tickets;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tickets = await db.tickets.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of tickets) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of tickets) {
        await record.destroy({ transaction });
      }
    });

    return tickets;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tickets = await db.tickets.findByPk(id, options);

    await tickets.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await tickets.destroy({
      transaction,
    });

    return tickets;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const tickets = await db.tickets.findOne({ where }, { transaction });

    if (!tickets) {
      return tickets;
    }

    const output = tickets.get({ plain: true });

    output.purchases_ticket = await tickets.getPurchases_ticket({
      transaction,
    });

    output.purchases = await tickets.getPurchases({
      transaction,
    });

    output.organization = await tickets.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.organizations,
        as: 'organization',
      },

      {
        model: db.purchases,
        as: 'purchases',
        through: filter.purchases
          ? {
              where: {
                [Op.or]: filter.purchases.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.purchases ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.event_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('tickets', 'event_name', filter.event_name),
        };
      }

      if (filter.event_dateRange) {
        const [start, end] = filter.event_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            event_date: {
              ...where.event_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            event_date: {
              ...where.event_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.organization) {
        const listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.tickets.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.tickets.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('tickets', 'event_name', query),
        ],
      };
    }

    const records = await db.tickets.findAll({
      attributes: ['id', 'event_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['event_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.event_name,
    }));
  }
};
