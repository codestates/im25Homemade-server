const { user } = require('../../models');

module.exports = {
  get: async (req, res) => {
    //TODO: email 중복 여부를 판단하는 로직 구현

    const { email } = req.body;
    const emailExist = await user.findOne({ where: { email } });

    if (emailExist) {
      return res.status(409).send('email already exists');
    } else if (!emailExist) {
      res.status(200).send('email available');
    } else {
      res.status(500).send('err');
    }
  },
};
