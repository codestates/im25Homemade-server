'use strict';
const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: '송정현',
          nickname: '푸드파이터',
          password: '12334',
          email: 'fjsf@naver.com',
          mobile: '010-1234-1234',
          avatar_url: 'www.awsS3.com/543',
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
        {
          name: '김용재',
          nickname: '요리왕비룡',
          password: '331234',
          email: 'ffdgjdf@gmail.com',
          mobile: '010-1111-2222',
          avatar_url: 'www.awsS3.com/542',
          createdAt: '2021-01-30 22:25:10',
          updatedAt: '2021-01-30 22:25:10',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
