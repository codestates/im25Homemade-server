'use strict';
const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          text: '별로인데요?',
          userId: 0,
          contentId: 0,
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
        {
          text: '먹음직스럽네요',
          userId: 0,
          contentId: 0,
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
        {
          text: '대박이다....',
          userId: 1,
          contentId: 1,
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
        {
          text: '맛있겠어요😙',
          userId: 1,
          contentId: 1,
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
        {
          text: '군침이 도네요',
          userId: 2,
          contentId: 2,
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
        {
          text: '윽.. 별로에요',
          userId: 2,
          contentId: 2,
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
