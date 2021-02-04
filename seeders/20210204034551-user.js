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
          createdAt,
          updatedAt,
        },
        {
          name: '김용재',
          nickname: '요리왕비룡',
          password: '331234',
          email: 'ffdgjdf@gmail.com',
          mobile: '010-1111-2222',
          avatar_url: 'www.awsS3.com/542',
          createdAt,
          updatedAt,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
