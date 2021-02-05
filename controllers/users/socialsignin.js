const { users } = require('../../models');
const session = require('express-session');
// const userinfo = require('./userinfo');
// const { response } = require('express');

module.exports = {
  //TODO: 소셜 로그인 로직 작성
  post: async (req, res) => {
    // console.log(req);
    const userInfo = await Users.findOne({
      where: { userId: req.body.email, password: req.body.password },
    });

    if (!userInfo) {
      // your code here
      res.status(400).send('not authorized');
    } else {
      // console.log(req.session);
      // console.log(userInfo.userId);
      // your code here
      //! HINT: req.session을 사용하세요.
      req.session.save(function () {
        //! session 에 userId 를 담아준다.
        req.session.userId = userInfo.userId;
        console.log(req.session);
        res.json({ data: userInfo, message: 'ok' });
      });
    }
  },
};
