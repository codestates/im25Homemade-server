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

      for (let i = 0; i < imageUrl.length; i++) {
        await image.update(
          {
            image_url: imageUrl[i],
          },
          {
            where: {
              contentId: contentId,
              order: i + 1,
            },
          },
        );
      }

      if (!isUpdated) {
        res.status(404).send('content not found');
      }
      const returnedUpdatedContent = await content.findOne({
        where: { id: contentId },
      });
      const returnImages = async () => {
        let images = [];
        for (let i = 0; i < imageUrl.length; i++) {
          let imageurl = await image.findOne({
            where: { contentId: contentId, order: i + 1 },
            attributes: ['image_url'],
          });
          images.push(imageurl);
        }
        return images;
      };

      const returnedImageUrls = await returnImages();

      return res.status(200).json({
        data: {
          contentInfo: {
            ...returnedUpdatedContent.dataValues,
            imageUrls: returnedImageUrls,
          },
        },
        message: 'ok',
      });
    } else {
      res.status(500).send('err');
    }
  },
};
