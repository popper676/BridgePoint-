const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('SuperAdmin'),
        name: 'Super Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('system_manager'),
        name: 'system_manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('event_manager'),
        name: 'event_manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('booking_coordinator'),
        name: 'booking_coordinator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('promotion_specialist'),
        name: 'promotion_specialist',
        createdAt,
        updatedAt,
      },

      {
        id: getId('customer_support'),
        name: 'customer_support',
        createdAt,
        updatedAt,
      },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'bookings',
      'feedback',
      'promotions',
      'purchases',
      'rooms',
      'tickets',
      'socialmediadata',
      'revenue',
      'roles',
      'permissions',
      'organizations',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.bulkUpdate(
      'roles',
      { globalAccess: true },
      { id: getId('SuperAdmin') },
    );

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('READ_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('CREATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('READ_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('DELETE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('READ_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('READ_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('READ_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('READ_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('UPDATE_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('READ_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('READ_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('CREATE_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('READ_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('UPDATE_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('DELETE_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('READ_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('UPDATE_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('READ_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('READ_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_ROOMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_ROOMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_ROOMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_ROOMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('READ_ROOMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('READ_ROOMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('READ_ROOMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_ROOMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('READ_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('UPDATE_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('DELETE_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('CREATE_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('READ_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('UPDATE_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('DELETE_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('READ_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('READ_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('READ_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('system_manager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('event_manager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('booking_coordinator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('promotion_specialist'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('customer_support'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_BOOKINGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_BOOKINGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_FEEDBACK'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_FEEDBACK'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_FEEDBACK'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PROMOTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PROMOTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PROMOTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PURCHASES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PURCHASES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PURCHASES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROOMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROOMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROOMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROOMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_TICKETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_TICKETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_TICKETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SOCIALMEDIADATA'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_SOCIALMEDIADATA'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_SOCIALMEDIADATA'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_SOCIALMEDIADATA'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_REVENUE'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_REVENUE'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_REVENUE'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_REVENUE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_BOOKINGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_BOOKINGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_BOOKINGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_BOOKINGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_FEEDBACK'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_FEEDBACK'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_FEEDBACK'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_FEEDBACK'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PROMOTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PROMOTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PROMOTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PROMOTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PURCHASES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PURCHASES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PURCHASES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PURCHASES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROOMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROOMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROOMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROOMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_TICKETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_TICKETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_TICKETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_TICKETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SOCIALMEDIADATA'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_SOCIALMEDIADATA'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_SOCIALMEDIADATA'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_SOCIALMEDIADATA'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_REVENUE'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_REVENUE'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_REVENUE'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_REVENUE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ORGANIZATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ORGANIZATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ORGANIZATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ORGANIZATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'system_manager',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'event_manager',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
