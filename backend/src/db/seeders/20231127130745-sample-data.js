const db = require('../models');
const Users = db.users;

const Bookings = db.bookings;

const Feedback = db.feedback;

const Promotions = db.promotions;

const Purchases = db.purchases;

const Rooms = db.rooms;

const Tickets = db.tickets;

const Socialmediadata = db.socialmediadata;

const Revenue = db.revenue;

const Organizations = db.organizations;

const BookingsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    check_in: new Date('2023-11-01T14:00:00'),

    check_out: new Date('2023-11-05T11:00:00'),

    confirmed: true,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    check_in: new Date('2023-11-10T14:00:00'),

    check_out: new Date('2023-11-12T11:00:00'),

    confirmed: false,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    check_in: new Date('2023-11-15T14:00:00'),

    check_out: new Date('2023-11-20T11:00:00'),

    confirmed: true,

    // type code here for "relation_one" field
  },
];

const FeedbackData = [
  {
    // type code here for "relation_one" field

    rating: 5,

    comments: 'Amazing experience! Highly recommend.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    rating: 4,

    comments: 'Great service, but the room was a bit small.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    rating: 3,

    comments: 'Average experience, could be better.',

    // type code here for "relation_one" field
  },
];

const PromotionsData = [
  {
    title: 'Winter Special',

    details: 'Get 20% off on all bookings made in December.',

    start_date: new Date('2023-12-01T00:00:00'),

    end_date: new Date('2023-12-31T23:59:59'),

    // type code here for "relation_one" field
  },

  {
    title: 'Early Bird Offer',

    details: 'Book your room 30 days in advance and save 15%.',

    start_date: new Date('2023-11-01T00:00:00'),

    end_date: new Date('2023-11-30T23:59:59'),

    // type code here for "relation_one" field
  },

  {
    title: 'Weekend Getaway',

    details: 'Enjoy a complimentary breakfast with weekend bookings.',

    start_date: new Date('2023-11-01T00:00:00'),

    end_date: new Date('2023-11-30T23:59:59'),

    // type code here for "relation_one" field
  },
];

const PurchasesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    purchase_date: new Date('2023-11-01T10:00:00'),

    redeemed: false,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    purchase_date: new Date('2023-11-02T11:00:00'),

    redeemed: true,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    purchase_date: new Date('2023-11-03T12:00:00'),

    redeemed: true,

    // type code here for "relation_one" field
  },
];

const RoomsData = [
  {
    name: 'Deluxe Suite',

    description: 'A luxurious suite with a king-sized bed and a stunning view.',

    price: 250,

    capacity: 2,

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Standard Room',

    description: 'A comfortable room with all the basic amenities.',

    price: 100,

    capacity: 2,

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Family Room',

    description:
      'Spacious room suitable for families, with two queen-sized beds.',

    price: 150,

    capacity: 4,

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const TicketsData = [
  {
    event_name: 'Escape Room Challenge',

    event_date: new Date('2023-12-01T18:00:00'),

    price: 50,

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    event_name: 'Mystery Night',

    event_date: new Date('2023-12-05T20:00:00'),

    price: 40,

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    event_name: 'Puzzle Adventure',

    event_date: new Date('2023-12-10T17:00:00'),

    price: 45,

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const SocialmediadataData = [
  {
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
  },
];

const RevenueData = [
  {
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Johannes Kepler',
  },

  {
    name: 'Max von Laue',
  },

  {
    name: 'Louis Pasteur',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }
}

async function associateBookingWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Booking0 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Booking0?.setUser) {
    await Booking0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Booking1 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Booking1?.setUser) {
    await Booking1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Booking2 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Booking2?.setUser) {
    await Booking2.setUser(relatedUser2);
  }
}

async function associateBookingWithRoom() {
  const relatedRoom0 = await Rooms.findOne({
    offset: Math.floor(Math.random() * (await Rooms.count())),
  });
  const Booking0 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Booking0?.setRoom) {
    await Booking0.setRoom(relatedRoom0);
  }

  const relatedRoom1 = await Rooms.findOne({
    offset: Math.floor(Math.random() * (await Rooms.count())),
  });
  const Booking1 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Booking1?.setRoom) {
    await Booking1.setRoom(relatedRoom1);
  }

  const relatedRoom2 = await Rooms.findOne({
    offset: Math.floor(Math.random() * (await Rooms.count())),
  });
  const Booking2 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Booking2?.setRoom) {
    await Booking2.setRoom(relatedRoom2);
  }
}

async function associateBookingWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Booking0 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Booking0?.setOrganization) {
    await Booking0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Booking1 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Booking1?.setOrganization) {
    await Booking1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Booking2 = await Bookings.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Booking2?.setOrganization) {
    await Booking2.setOrganization(relatedOrganization2);
  }
}

async function associateFeedbackWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Feedback0 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Feedback0?.setUser) {
    await Feedback0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Feedback1 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Feedback1?.setUser) {
    await Feedback1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Feedback2 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Feedback2?.setUser) {
    await Feedback2.setUser(relatedUser2);
  }
}

async function associateFeedbackWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Feedback0 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Feedback0?.setOrganization) {
    await Feedback0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Feedback1 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Feedback1?.setOrganization) {
    await Feedback1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Feedback2 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Feedback2?.setOrganization) {
    await Feedback2.setOrganization(relatedOrganization2);
  }
}

async function associatePromotionWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Promotion0 = await Promotions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Promotion0?.setOrganization) {
    await Promotion0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Promotion1 = await Promotions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Promotion1?.setOrganization) {
    await Promotion1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Promotion2 = await Promotions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Promotion2?.setOrganization) {
    await Promotion2.setOrganization(relatedOrganization2);
  }
}

async function associatePurchaseWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Purchase0 = await Purchases.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Purchase0?.setUser) {
    await Purchase0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Purchase1 = await Purchases.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Purchase1?.setUser) {
    await Purchase1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Purchase2 = await Purchases.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Purchase2?.setUser) {
    await Purchase2.setUser(relatedUser2);
  }
}

async function associatePurchaseWithTicket() {
  const relatedTicket0 = await Tickets.findOne({
    offset: Math.floor(Math.random() * (await Tickets.count())),
  });
  const Purchase0 = await Purchases.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Purchase0?.setTicket) {
    await Purchase0.setTicket(relatedTicket0);
  }

  const relatedTicket1 = await Tickets.findOne({
    offset: Math.floor(Math.random() * (await Tickets.count())),
  });
  const Purchase1 = await Purchases.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Purchase1?.setTicket) {
    await Purchase1.setTicket(relatedTicket1);
  }

  const relatedTicket2 = await Tickets.findOne({
    offset: Math.floor(Math.random() * (await Tickets.count())),
  });
  const Purchase2 = await Purchases.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Purchase2?.setTicket) {
    await Purchase2.setTicket(relatedTicket2);
  }
}

async function associatePurchaseWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Purchase0 = await Purchases.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Purchase0?.setOrganization) {
    await Purchase0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Purchase1 = await Purchases.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Purchase1?.setOrganization) {
    await Purchase1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Purchase2 = await Purchases.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Purchase2?.setOrganization) {
    await Purchase2.setOrganization(relatedOrganization2);
  }
}

// Similar logic for "relation_many"

async function associateRoomWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Room0 = await Rooms.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Room0?.setOrganization) {
    await Room0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Room1 = await Rooms.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Room1?.setOrganization) {
    await Room1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Room2 = await Rooms.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Room2?.setOrganization) {
    await Room2.setOrganization(relatedOrganization2);
  }
}

// Similar logic for "relation_many"

async function associateTicketWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Ticket0 = await Tickets.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Ticket0?.setOrganization) {
    await Ticket0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Ticket1 = await Tickets.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Ticket1?.setOrganization) {
    await Ticket1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Ticket2 = await Tickets.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Ticket2?.setOrganization) {
    await Ticket2.setOrganization(relatedOrganization2);
  }
}

async function associateSocialmediadatumWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Socialmediadatum0 = await Socialmediadata.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Socialmediadatum0?.setOrganization) {
    await Socialmediadatum0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Socialmediadatum1 = await Socialmediadata.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Socialmediadatum1?.setOrganization) {
    await Socialmediadatum1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Socialmediadatum2 = await Socialmediadata.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Socialmediadatum2?.setOrganization) {
    await Socialmediadatum2.setOrganization(relatedOrganization2);
  }
}

async function associateRevenueWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Revenue0 = await Revenue.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Revenue0?.setOrganization) {
    await Revenue0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Revenue1 = await Revenue.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Revenue1?.setOrganization) {
    await Revenue1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Revenue2 = await Revenue.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Revenue2?.setOrganization) {
    await Revenue2.setOrganization(relatedOrganization2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Bookings.bulkCreate(BookingsData);

    await Feedback.bulkCreate(FeedbackData);

    await Promotions.bulkCreate(PromotionsData);

    await Purchases.bulkCreate(PurchasesData);

    await Rooms.bulkCreate(RoomsData);

    await Tickets.bulkCreate(TicketsData);

    await Socialmediadata.bulkCreate(SocialmediadataData);

    await Revenue.bulkCreate(RevenueData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateBookingWithUser(),

      await associateBookingWithRoom(),

      await associateBookingWithOrganization(),

      await associateFeedbackWithUser(),

      await associateFeedbackWithOrganization(),

      await associatePromotionWithOrganization(),

      await associatePurchaseWithUser(),

      await associatePurchaseWithTicket(),

      await associatePurchaseWithOrganization(),

      // Similar logic for "relation_many"

      await associateRoomWithOrganization(),

      // Similar logic for "relation_many"

      await associateTicketWithOrganization(),

      await associateSocialmediadatumWithOrganization(),

      await associateRevenueWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bookings', null, {});

    await queryInterface.bulkDelete('feedback', null, {});

    await queryInterface.bulkDelete('promotions', null, {});

    await queryInterface.bulkDelete('purchases', null, {});

    await queryInterface.bulkDelete('rooms', null, {});

    await queryInterface.bulkDelete('tickets', null, {});

    await queryInterface.bulkDelete('socialmediadata', null, {});

    await queryInterface.bulkDelete('revenue', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
