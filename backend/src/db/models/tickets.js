const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const tickets = sequelize.define(
    'tickets',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      event_name: {
        type: DataTypes.TEXT,
      },

      event_date: {
        type: DataTypes.DATE,
      },

      price: {
        type: DataTypes.DECIMAL,
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

  tickets.associate = (db) => {
    db.tickets.belongsToMany(db.purchases, {
      as: 'purchases',
      foreignKey: {
        name: 'tickets_purchasesId',
      },
      constraints: false,
      through: 'ticketsPurchasesPurchases',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.tickets.hasMany(db.purchases, {
      as: 'purchases_ticket',
      foreignKey: {
        name: 'ticketId',
      },
      constraints: false,
    });

    //end loop

    db.tickets.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.tickets.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tickets.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return tickets;
};
