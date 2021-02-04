const { Users } = require('../../models');
module.exports = {
  post: (req, res) => {
    //TODO: 로그아웃 로직 작성
    // 앞서 로그인시 세션 객체에 저장했던 값이 존재할 경우, 이미 로그인한 상태로 판단할 수 있습니다.
    // 세션 객체에 담긴 값의 존재 여부에 따라 응답을 구현하세요.
    // const userId = await Users.findOne({where: {userId: req.session.userId}})
    if (!req.session.userId) {
      // your code here
      res.status(400).json({ message: 'not authorized' });
    } else {
      // your code here
      // TODO: 로그아웃 요청은 세션을 삭제하는 과정을 포함해야 합니다.
      req.session.destroy(); // 세션 삭제
      // res.clearCookie("sid"); // 세션 쿠키 삭제
      res.status(200).json({ message: 'ok' });
    }
  },
};
