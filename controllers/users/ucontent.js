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
      const { contentId, imageUrls, title, contents, thumbnailUrl } = req.body;

      // content 업데이트(이미지 제외)
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
      // image 업데이트
      function upsert(values, condition) {
        return image.findOne({ where: condition }).then(function (obj) {
          // 찾아서 있으면 update. 요소를 찾아서 바로 업데이트 해줄 수 있다.
          if (obj) return obj.update(values);
          // 찾아서 없으면 insert.
          return image.create(values);
        });
      }

      for (let i = 0; i < imageUrls.length; i++) {
        let imageurl = imageUrls[i];
        upsert(
          { image_url: imageurl, contentId: contentId, order: i + 1 },
          { contentId: contentId, order: i + 1 },
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
        for (let i = 0; i < imageUrls.length; i++) {
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
