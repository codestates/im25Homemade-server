const { user, content, image, categorie } = require('../../models');
const jwt = require('jsonwebtoken');
module.exports = {
  delete: async (req, res) => {
    //TODO: 유저 회원탈퇴 로직
    if (req.headers.authorization) {
      const tokencode = req.headers.authorization.split(' ')[1];
      const token = await jwt.verify(tokencode, process.env.ACCESS_SECERET);

      await user.destroy({
        where: { id: token.id },
      });

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
