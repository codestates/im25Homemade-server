const { content } = require('../../models');
const { image } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');

module.exports = {
  patch: async (req, res) => {
    //TODO: 글내용 업데이트 로직 작성
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else if (accessTokenData) {
      const { contentId, imageUrl, title, contents, thumbnailUrl } = req.body;

      //! contentInfo 를 배열로 담아서 유저에게 전달. 고민 필요.
      const isUpdated = await content.update(
        {
          title: title,
          content: contents,
          thumbnail_url: thumbnailUrl,
          updatedAt: new Date(),
        },
        {
          where: { id: contentId },
        },
      );
      const isImageUpdated = await image.update(
        {
          image_url: imageUrl,
        },
        {
          where: {
            contentId: contentId, //! returning, plain 필요없음 => 다른 업데이트 로직 변경할 것.
          },
        },
      );

      if (!isUpdated || !isImageUpdated) {
        res.status(404).send('content not found');
      }
      const returnedUpdatedContent = await content.findOne({
        where: { id: contentId },
      });
      const returnedUpdatedImage = await image.findOne({
        where: { contentId: contentId },
      });

      return res.status(200).json({
        data: {
          contentInfo: {
            ...returnedUpdatedContent.dataValues,
            image_url: returnedUpdatedImage.image_url,
          },
        },
        message: 'ok',
      });
    } else {
      res.status(500).send('err');
    }
  },
};
