const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  patch: async (req, res) => {
    //TODO: 댓글 업데이트 로직 작성
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(404).send('invalid user');
    } else if (accessTokenData) {
      const { text, contentId, commentId } = req.body;

      const isUpdated = await comment.update(
        { text: text, updatedAt: new Date() },
        {
          where: { userId: accessTokenData.id, contentId: contentId },
          returning: true,
          plain: true,
        },
      );

      if (!isUpdated) {
        throw 'Error while Updating';
      }
      const returnedUpdatedComment = await comment.findOne({
        where: { id: commentId },
      });
      res
        .status(200)
        .json({ data: { commentInfo: returnedUpdatedComment.dataValues } });
    } else {
      res.status(500).send('err');
    }
  },
};
