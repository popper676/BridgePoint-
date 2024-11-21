const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const bookings = sequelize.define(
    'bookings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      check_in: {
        type: DataTypes.DATE,
      },

      check_out: {
        type: DataTypes.DATE,
      },

      confirmed: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
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

  bookings.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.bookings.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.bookings.belongsTo(db.rooms, {
      as: 'room',
      foreignKey: {
        name: 'roomId',
      },
      constraints: false,
    });

    db.bookings.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.bookings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.bookings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return bookings;
};
