const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PurchasesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const purchases = await db.purchases.create(
      {
        id: data.id || undefined,

        purchase_date: data.purchase_date || null,
        redeemed: data.redeemed || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await purchases.setUser(data.user || null, {
      transaction,
    });

    await purchases.setTicket(data.ticket || null, {
      transaction,
    });

    await purchases.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return purchases;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const purchasesData = data.map((item, index) => ({
      id: item.id || undefined,

      purchase_date: item.purchase_date || null,
      redeemed: item.redeemed || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const purchases = await db.purchases.bulkCreate(purchasesData, {
      transaction,
    });

    // For each item created, replace relation files

    return purchases;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const purchases = await db.purchases.findByPk(id, {}, { transaction });

    await purchases.update(
      {
        purchase_date: data.purchase_date || null,
        redeemed: data.redeemed || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    await purchases.setUser(data.user || null, {
      transaction,
    });

    await purchases.setTicket(data.ticket || null, {
      transaction,
    });

    await purchases.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return purchases;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const purchases = await db.purchases.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of purchases) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of purchases) {
        await record.destroy({ transaction });
      }
    });

    return purchases;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const purchases = await db.purchases.findByPk(id, options);

    await purchases.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await purchases.destroy({
      transaction,
    });

    return purchases;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const purchases = await db.purchases.findOne({ where }, { transaction });

    if (!purchases) {
      return purchases;
    }

    const output = purchases.get({ plain: true });

    output.user = await purchases.getUser({
      transaction,
    });

    output.ticket = await purchases.getTicket({
      transaction,
    });

    output.organization = await purchases.getOrganization({
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
        model: db.users,
        as: 'user',
      },

      {
        model: db.tickets,
        as: 'ticket',
      },

      {
        model: db.organizations,
        as: 'organization',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.purchase_dateRange) {
        const [start, end] = filter.purchase_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            purchase_date: {
              ...where.purchase_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            purchase_date: {
              ...where.purchase_date,
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

      if (filter.redeemed) {
        where = {
          ...where,
          redeemed: filter.redeemed,
        };
      }

      if (filter.user) {
        const listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.ticket) {
        const listItems = filter.ticket.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          ticketId: { [Op.or]: listItems },
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
          count: await db.purchases.count({
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
      : await db.purchases.findAndCountAll({
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
          Utils.ilike('purchases', 'purchase_date', query),
        ],
      };
    }

    const records = await db.purchases.findAll({
      attributes: ['id', 'purchase_date'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['purchase_date', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.purchase_date,
    }));
  }
};
