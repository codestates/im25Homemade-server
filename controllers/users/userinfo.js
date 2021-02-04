const { Users } = require('../../models');

module.exports = {
  get: async (req, res) => {
    //TODO: 유저정보 get 요청 로직 작성
    // TODO: 세션 객체에 담긴 값의 존재 여부에 따라 응답을 구현하세요.
    //! HINT: 세션 객체에 담긴 정보가 궁금하다면 req.session을 콘솔로 출력해보세요
    // console.log("here is userinfo in server");
    // console.log(req.session);
    if (!req.session.userId) {
      // your code here
      res.status(400).send({ data: null, message: 'not authorized' });
    } else {
      // your code here
      //! 세션의 userId 와 일치하는 데이터를 가져온다.
      let userInfo = await Users.findOne({
        where: { userId: req.session.userId },
      });
      // TODO: 데이터베이스에서 로그인한 사용자의 정보를 조회한 후 응답합니다.
      res.status(200).json({ data: userInfo, message: 'ok' });
    }
  },
};
