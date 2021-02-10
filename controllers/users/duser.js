const { user, content, image, comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');

module.exports = {
  delete: async (req, res) => {
    //TODO: 유저 회원탈퇴 로직
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else {
      console.log(accessTokenData.id);
      const userId = accessTokenData.id;

      //지워야할 데이터? 1. 유저 2. 모든 컨텐츠 3. 모든 이미지 4. 모든 댓글
      //! 1. 유저 데이터 삭제
      await user.destroy({
        where: { id: userId },
      });
      // user.destroy => 삭제된 갯수를 return 한다. 즉, 찾으면 삭제한다.

      const findContents = await content.findAll({
        where: { userId: userId },
        attributes: ['id'],
      });
      let contentIdArray = findContents.map(content => content.dataValues.id);

      //! 2. 모든 이미지 삭제(content id 필요)
      await image.destroy({
        where: { contentId: contentIdArray },
      });
      //! 3. 모든 댓글 삭제(content id 필요)
      await comment.destroy({
        where: { contentId: contentIdArray },
      });
      //! 4. 마지막으로 모든 컨텐츠 데이터 삭제.
      await content.destroy({
        where: { userId: userId },
      });
      return res.status(200).send('deleted user information successfully');
    }
    return res.status(500).send('err');
  },
};
