const { Users } = require('../../models');
module.exports = {
  post: (req, res) => {
    // TODO : 회원가입 로직 및 유저 생성 로직 작성
    const { email, password, username, mobile } = req.body;

    if (!email || !password || !username || !mobile) {
      return res.status(422).send('insufficient parameters supplied');
    }

    user
      .findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          password: password,
          username: username,
          mobile: mobile,
        },
      })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send('email exists');
        }
        const data = await user.get({ plain: true });
        //? get, plain?
        // console.log("here is signUpController");
        // console.log(data);
        res.status(201).json(data);
      });
  },
};
