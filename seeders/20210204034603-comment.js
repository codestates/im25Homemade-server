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
          userId: 1,
          contentId: 1,
          createdAt,
          updatedAt,
        },
        {
          text: '먹음직스럽네요',
          userId: 1,
          contentId: 2,
          createdAt,
          updatedAt,
        },
        {
          text: '대박이다....',
          userId: 2,
          contentId: 1,
          createdAt,
          updatedAt,
        },
        {
          text: '맛있겠어요😙',
          userId: 2,
          contentId: 2,
          createdAt,
          updatedAt,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
