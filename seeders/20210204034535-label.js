'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'labels',
      [
        {
          name: '한식장인',
        },
        {
          name: '양식장인',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('labels', null, {});
  },
};
