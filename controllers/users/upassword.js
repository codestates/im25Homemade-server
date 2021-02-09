const { user } = require('../../models');

module.exports = {
  patch: async (req, res) => {
    //TODO: 비밀번호 업데이트 로직 작성

    const { name, email, mobile, password } = req.body;

    if (name && email && mobile) {
      const isUser = await user.findOne({
        where: {
          name: name,
          email: email,
          mobile: mobile,
        },
      });
      console.log(isUser);
      if (!isUser) {
        res.status(400).send('user not found');
      } else {
        res.status(200).send('user exists');
      }
    } else if (email && password) {
      const isUpdated = await user.update(
        {
          password: password,
          updatedAt: new Date(),
        },
        {
          where: { email: email },
        },
      );
      if (!isUpdated) {
        throw 'Error while Updating';
      }
      res.status(200).send('password successfully updated');
    } else {
      res.status(500).send('err');
    }
  },
};
