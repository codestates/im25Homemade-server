const { comment, image } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');
module.exports = {
  delete: async (req, res) => {
    //TODO: 레시피 댓글 삭제 요청 로직 작성
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else {
      const deletedComment = await comment.destroy({
        where: { id: req.body.id },
      });

      if (!deletedComment) {
        return res.status(400).send('cannot find comment');
      }
      return res.status(200).send('delete comment successfully');
    }
    return res.status(500).send('err');
  },
};
