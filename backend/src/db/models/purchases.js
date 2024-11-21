const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const purchases = sequelize.define(
    'purchases',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      purchase_date: {
        type: DataTypes.DATE,
      },

      redeemed: {
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

  purchases.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.purchases.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.purchases.belongsTo(db.tickets, {
      as: 'ticket',
      foreignKey: {
        name: 'ticketId',
      },
      constraints: false,
    });

    db.purchases.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.purchases.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.purchases.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return purchases;
};
