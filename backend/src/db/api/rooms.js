const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class RoomsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rooms = await db.rooms.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        description: data.description || null,
        price: data.price || null,
        capacity: data.capacity || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await rooms.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    await rooms.setBookings(data.bookings || [], {
      transaction,
    });

    return rooms;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const roomsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      description: item.description || null,
      price: item.price || null,
      capacity: item.capacity || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const rooms = await db.rooms.bulkCreate(roomsData, { transaction });

    // For each item created, replace relation files

    return rooms;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const rooms = await db.rooms.findByPk(id, {}, { transaction });

    await rooms.update(
      {
        name: data.name || null,
        description: data.description || null,
        price: data.price || null,
        capacity: data.capacity || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await rooms.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    await rooms.setBookings(data.bookings || [], {
      transaction,
    });

    return rooms;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rooms = await db.rooms.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of rooms) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of rooms) {
        await record.destroy({ transaction });
      }
    });

    return rooms;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const rooms = await db.rooms.findByPk(id, options);

    await rooms.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await rooms.destroy({
      transaction,
    });

    return rooms;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const rooms = await db.rooms.findOne({ where }, { transaction });

    if (!rooms) {
      return rooms;
    }

    const output = rooms.get({ plain: true });

    output.bookings_room = await rooms.getBookings_room({
      transaction,
    });

    output.bookings = await rooms.getBookings({
      transaction,
    });

    output.organization = await rooms.getOrganization({
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
        model: db.bookings,
        as: 'bookings',
        through: filter.bookings
          ? {
              where: {
                [Op.or]: filter.bookings.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.bookings ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('rooms', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('rooms', 'description', filter.description),
        };
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

      if (filter.capacityRange) {
        const [start, end] = filter.capacityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            capacity: {
              ...where.capacity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            capacity: {
              ...where.capacity,
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
          count: await db.rooms.count({
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
      : await db.rooms.findAndCountAll({
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
          Utils.ilike('rooms', 'name', query),
        ],
      };
    }

    const records = await db.rooms.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
