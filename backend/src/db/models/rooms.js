const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const rooms = sequelize.define(
    'rooms',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      price: {
        type: DataTypes.DECIMAL,
      },

      capacity: {
        type: DataTypes.INTEGER,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  rooms.associate = (db) => {
    db.rooms.belongsToMany(db.bookings, {
      as: 'bookings',
      foreignKey: {
        name: 'rooms_bookingsId',
      },
      constraints: false,
      through: 'roomsBookingsBookings',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.rooms.hasMany(db.bookings, {
      as: 'bookings_room',
      foreignKey: {
        name: 'roomId',
      },
      constraints: false,
    });

    //end loop

    db.rooms.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.rooms.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.rooms.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return rooms;
};
