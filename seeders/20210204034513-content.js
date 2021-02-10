'use strict';
const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'contents',
      [
        {
          title: '김치볶음밥',
          content: '이렇게 요리하시면 됩니다.',
          rate: 0,
          views: 32,
          thumbnail_url: 'www.awsS3.com/521',
          userId: 1,
          categoryId: 1,
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
        {
          title: '된장찌개',
          content: '두부가 맛있는 된장찌개',
          rate: 5,
          views: 55,
          thumbnail_url: 'www.awsS3.com/522',
          userId: 2,
          categoryId: 1,
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
        {
          title: '스테이크 맛있게 굽는법',
          content: '와인과 함께 하는 스테이크',
          rate: 4,
          views: 100,
          thumbnail_url: '스테이크 유알엘',
          userId: 3,
          categoryId: 4,
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contents', null, {});
  },
};
