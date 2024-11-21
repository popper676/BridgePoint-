const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class BookingsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.create(
      {
        id: data.id || undefined,

        check_in: data.check_in || null,
        check_out: data.check_out || null,
        confirmed: data.confirmed || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await bookings.setUser(data.user || null, {
      transaction,
    });

    await bookings.setRoom(data.room || null, {
      transaction,
    });

    await bookings.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return bookings;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const bookingsData = data.map((item, index) => ({
      id: item.id || undefined,

      check_in: item.check_in || null,
      check_out: item.check_out || null,
      confirmed: item.confirmed || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const bookings = await db.bookings.bulkCreate(bookingsData, {
      transaction,
    });

    // For each item created, replace relation files

    return bookings;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const bookings = await db.bookings.findByPk(id, {}, { transaction });

    await bookings.update(
      {
        check_in: data.check_in || null,
        check_out: data.check_out || null,
        confirmed: data.confirmed || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    await bookings.setUser(data.user || null, {
      transaction,
    });

    await bookings.setRoom(data.room || null, {
      transaction,
    });

    await bookings.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return bookings;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of bookings) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of bookings) {
        await record.destroy({ transaction });
      }
    });

    return bookings;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.findByPk(id, options);

    await bookings.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await bookings.destroy({
      transaction,
    });

    return bookings;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.findOne({ where }, { transaction });

    if (!bookings) {
      return bookings;
    }

    const output = bookings.get({ plain: true });

    output.user = await bookings.getUser({
      transaction,
    });

    output.room = await bookings.getRoom({
      transaction,
    });

    output.organization = await bookings.getOrganization({
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
        model: db.rooms,
        as: 'room',
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

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              check_in: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              check_out: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.check_inRange) {
        const [start, end] = filter.check_inRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            check_in: {
              ...where.check_in,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            check_in: {
              ...where.check_in,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.check_outRange) {
        const [start, end] = filter.check_outRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            check_out: {
              ...where.check_out,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            check_out: {
              ...where.check_out,
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

      if (filter.confirmed) {
        where = {
          ...where,
          confirmed: filter.confirmed,
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

      if (filter.room) {
        const listItems = filter.room.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          roomId: { [Op.or]: listItems },
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
          count: await db.bookings.count({
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
      : await db.bookings.findAndCountAll({
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
          Utils.ilike('bookings', 'check_in', query),
        ],
      };
    }

    const records = await db.bookings.findAll({
      attributes: ['id', 'check_in'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['check_in', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.check_in,
    }));
  }
};
