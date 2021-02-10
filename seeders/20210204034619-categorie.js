'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'korea',
          contentId: 1,
        },
        {
          name: 'china',
          contentId: 2,
        },
        { name: 'japan', contentId: 3 },
        {
          name: 'west',
          contentId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
