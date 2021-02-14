const { user } = require('../../models');
const crypto = require('crypto');
require('dotenv').config;

module.exports = {
  patch: async (req, res) => {
    //TODO: 비밀번호 업데이트 로직 작성

    const { name, email, mobile, password } = req.body;

    if (name && email && mobile) {
      const isUser = await user.findOne({
        where: {
          name: name,
          email: email,
          mobile: mobile,
        },
      });
      if (!isUser) {
        res.status(400).send('user not found');
      } else {
        res.status(200).send('user exists');
      }
    } else if (email && password) {
      const encrypted = crypto
        .pbkdf2Sync(password, process.env.DATABASE_SALT, 100000, 64, 'sha512')
        .toString('base64');
      const isUpdated = await user.update(
        {
          password: encrypted,
          updatedAt: new Date(),
        },
        {
          where: { email: email },
        },
      );

      if (!isUpdated) {
        res.status(404).send('userinfo not found');
      }
      res.status(202).send('password successfully updated');
    } else {
      res.status(500).send('err');
    }
  },
};
