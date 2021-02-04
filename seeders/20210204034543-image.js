'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'images',
      [
        {
          name: '재료',
          image_url: 'www.naver.com/54',
          order: 1,
          contentId: 1,
        },
        {
          name: '기본재료 넣기',
          image_url: 'www.naver.com/52',
          order: 2,
          contentId: 1,
        },
        {
          name: '물끓이기',
          image_url: 'www.naver.com/55',
          order: 3,
          contentId: 1,
        },
        {
          name: '재료',
          image_url: 'www.naver.com/45',
          order: 1,
          contentId: 2,
        },
        {
          name: '물끓이기',
          image_url: 'www.naver.com/35',
          order: 2,
          contentId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('images', null, {});
  },
};
