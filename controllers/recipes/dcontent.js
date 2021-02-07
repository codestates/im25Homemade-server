const { content, image, categorie } = require('../../models');

module.exports = {
  delete: async (req, res) => {
    //TODO: 레시피 글 삭제 요청 로직 작성
    if (req.headers.authorization) {
      const contentInfo = await content.destroy({
        where: { id: req.body.id },
      });

      await image.destroy({
        where: { id: contentInfo.dataValues.id },
      });

      await categorie.destroy({
        where: { id: contentInfo.dataValues.categoryId },
      });

      res.status(200).send('delete content successfully');
    } else if (!req.headers.authorization) {
      res.status(401).send('invalid token');
    }
    res.send(err);
  },
};
