const { content } = require('../../models');
const { image } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  patch: async (req, res) => {
    //TODO: 글내용 업데이트 로직 작성
    console.log('here is ucontent!!!');
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(404).send('invalid user');
    } else if (accessTokenData) {
      const { contentId, imageurl, title, contents, Thumbnail } = req.body;
      //! 이미지를 제외한 정보의 업데이트 => 완료
      const isContentUpdated = await content.update(
        {
          title: title,
          content: contents,
          thumbnail_url: Thumbnail,
          updatedAt: new Date(),
        },
        {
          where: { id: contentId },
          returning: true,
          plain: true,
        },
      );
      //! 이미지 업데이트 부분
      const imageIds = await image.findAll({ where: { contentId: contentId } });

      let imageArr = [];

      for (let i = 0; i < imageIds.length; i++) {
        imageArr.push(imageIds[i].id);
      }

      console.log(imageArr);

      for (let i = 0; i < imageArr.length; i++) {
        const updateImg = await image.update();
      }

      //   if (!isContentUpdated) {
      //     throw 'Error while Updating';
      //   }
      //   const returnedUpdatedComment = await comment.findOne({
      //     where: { id: commentId },
      //   });
      //   res
      //     .status(200)
      //     .json({ data: { commentInfo: returnedUpdatedComment.dataValues } });
      // } else {
      //   res.status(500).send('err');
    }
  },
};
