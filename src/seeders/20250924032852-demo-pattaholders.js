// seeders/20250924-demo-pattaholders.js
const bcrypt = require('bcrypt');

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Pre-hash password for all patta holders
    const defaultPassword = await bcrypt.hash('user123', 10);

    // Insert 10 patta holders
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Patta Holder 1',
        email: 'patta1@demo.com',
        password: defaultPassword,
        role: 'patta_holder',
        districtId: 1,
        claimedArea: 5,      // numeric
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patta Holder 2',
        email: 'patta2@demo.com',
        password: defaultPassword,
        role: 'patta_holder',
        districtId: 1,
        claimedArea: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patta Holder 3',
        email: 'patta3@demo.com',
        password: defaultPassword,
        role: 'patta_holder',
        districtId: 2,
        claimedArea: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patta Holder 4',
        email: 'patta4@demo.com',
        password: defaultPassword,
        role: 'patta_holder',
        districtId: 2,
        claimedArea: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patta Holder 5',
        email: 'patta5@demo.com',
        password: defaultPassword,
        role: 'patta_holder',
        districtId: 1,
        claimedArea: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patta Holder 6',
        email: 'patta6@demo.com',
        password: defaultPassword,
        role: 'patta_holder',
        districtId: 2,
        claimedArea: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patta Holder 7',
        email: 'patta7@demo.com',
        password: defaultPassword,
        role: 'patta_holder',
        districtId: 1,
        claimedArea: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patta Holder 8',
        email: 'patta8@demo.com',
        password: defaultPassword,
        role: 'patta_holder',
        districtId: 2,
        claimedArea: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patta Holder 9',
        email: 'patta9@demo.com',
        password: defaultPassword,
        role: 'patta_holder',
        districtId: 1,
        claimedArea: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Patta Holder 10',
        email: 'patta10@demo.com',
        password: defaultPassword,
        role: 'patta_holder',
        districtId: 2,
        claimedArea: 2.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove all patta holders
    await queryInterface.bulkDelete('Users', { role: 'patta_holder' }, {});
  },
};
