const { user } = require('../../models');
const crypto = require('crypto');
require('dotenv').config();

module.exports = {
  post: (req, res) => {
    // TODO : 회원가입 로직 및 유저 생성 로직 작성

    const { email, name, password, nickname, mobile } = req.body;

    const encrypted = crypto
      .pbkdf2Sync(password, process.env.DATABASE_SALT, 100000, 64, 'sha512')
      .toString('base64');

    user
      .findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          name: name,
          password: encrypted,
          nickname: nickname,
          mobile: mobile,
        },
      })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send('email already exists');
        }
        res.status(201).send('created successfully');
      })
      .catch(err => {
        res.status(500).send('err');
      });
  },
};
