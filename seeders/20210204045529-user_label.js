'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user_labels',
      [
        {
          userId: 1,
          labelId: 1,
        },
        {
          userId: 2,
          labelId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_labels', null, {});
  },
};
