const { user } = require('../../models');
module.exports = {
  post: (req, res) => {
    // TODO : 회원가입 로직 및 유저 생성 로직 작성

    const { email, name, password, nickname, mobile } = req.body;
    console.log(name);
    user
      .findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          name: name,
          password: password,
          nickname: nickname,
          mobile: mobile,
        },
      })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send('email already exists');
        }
        res.status(201).send('Created Successfully');
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
};
