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
        {
          name: '고기',
          image_url: '고기이미지 유알엘',
          order: 1,
          contentId: 3,
        },
        {
          name: '와인',
          image_url: '와인을 곁들이는 모습 유알엘',
          order: 2,
          contentId: 3,
        },
        {
          name: '마늘굽기',
          image_url: '마늘굽는 모습 유알엘',
          order: 3,
          contentId: 3,
        },
        {
          name: '미디엄으로',
          image_url: '미디엄 스테이크 유알엘',
          order: 4,
          contentId: 3,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('images', null, {});
  },
};
