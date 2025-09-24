'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // ----------------- States -----------------
    const stateId = 1;
    await queryInterface.bulkInsert('States', [
      { id: stateId, name: 'DemoState', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // ----------------- Districts -----------------
    const districtId1 = 1;
    const districtId2 = 2;

    await queryInterface.bulkInsert('Districts', [
      { id: districtId1, name: 'DemoDistrict1', stateId, createdAt: new Date(), updatedAt: new Date() },
      { id: districtId2, name: 'DemoDistrict2', stateId, createdAt: new Date(), updatedAt: new Date() }
    ]);

    // ----------------- Users -----------------
    // Plain text passwords for Postman testing
    const passwords = {
      admin: 'admin123',
      officer: 'officer123',
      pattaHolder: 'user123'
    };

    // Officer Code (used in your signupOfficer flow)
    const OFFICER_CODE = 'OFFICER2025';

    // Hash passwords
    const hashedAdminPassword = await bcrypt.hash(passwords.admin, 10);
    const hashedOfficerPassword = await bcrypt.hash(passwords.officer, 10);
    const hashedUserPassword = await bcrypt.hash(passwords.pattaHolder, 10);

    await queryInterface.bulkInsert('Users', [
      // Admin
      {
        name: 'Admin User',
        email: 'admin@demo.com',
        password: hashedAdminPassword,
        role: 'admin',
        districtId: districtId1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Officers
      {
        name: 'Officer One',
        email: 'officer1@demo.com',
        password: hashedOfficerPassword,
        role: 'officer',
        districtId: districtId1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Officer Two',
        email: 'officer2@demo.com',
        password: hashedOfficerPassword,
        role: 'officer',
        districtId: districtId2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Patta Holders (10 users)
      {
        name: 'Patta Holder 1',
        email: 'user1@demo.com',
        password: hashedUserPassword,
        role: 'patta_holder',
        districtId: districtId1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patta Holder 2',
        email: 'user2@demo.com',
        password: hashedUserPassword,
        role: 'patta_holder',
        districtId: districtId1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patta Holder 3',
        email: 'user3@demo.com',
        password: hashedUserPassword,
        role: 'patta_holder',
        districtId: districtId1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patta Holder 4',
        email: 'user4@demo.com',
        password: hashedUserPassword,
        role: 'patta_holder',
        districtId: districtId2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patta Holder 5',
        email: 'user5@demo.com',
        password: hashedUserPassword,
        role: 'patta_holder',
        districtId: districtId2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patta Holder 6',
        email: 'user6@demo.com',
        password: hashedUserPassword,
        role: 'patta_holder',
        districtId: districtId2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patta Holder 7',
        email: 'user7@demo.com',
        password: hashedUserPassword,
        role: 'patta_holder',
        districtId: districtId1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patta Holder 8',
        email: 'user8@demo.com',
        password: hashedUserPassword,
        role: 'patta_holder',
        districtId: districtId1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patta Holder 9',
        email: 'user9@demo.com',
        password: hashedUserPassword,
        role: 'patta_holder',
        districtId: districtId2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patta Holder 10',
        email: 'user10@demo.com',
        password: hashedUserPassword,
        role: 'patta_holder',
        districtId: districtId2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Districts', null, {});
    await queryInterface.bulkDelete('States', null, {});
  }
};
