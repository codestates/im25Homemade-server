const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const sequelize = require('./models').sequelize;
const cookieParser = require('cookie-parser');
/*********************** Multer setting ************************************************************
 *********************************************************************************************/
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'image-storage-homemade',
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});
/*********************** Multer setting end ************************************************************
 ********************************************************************************************/

const app = express();
app.set('port', 4000);
app.use(
  cors({
    origin: true,
    credentials: true,

    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  }),
);

sequelize

  .sync({ force: false, alter: true })

  .then(() => console.log('데이터베이스 연결 성공'))
  .catch(err => console.error(err));
//force: true라면 서버 시작 시 테이블 재생성 (테이블 잘못 생성되었을 때, 개발 초기에 사용하자.)
//관계를 추가, 수정 하거나 안에 있는 컬럼들을 바꿀때가 있는데 alter : true 를 줘야한다.
// https://velog.io/@jwisgenius/sequelize-model-sync-%EC%88%98%EC%A0%95%ED%95%98%EA%B8%B0

/*********************** Multer code ************************************************************
 ********************************************************************************************/
app.post('/image', upload.array('imgs', 20), function (req, res) {
  //sort(file.originalname) 한번 하고, foreach() 돌리기전에
  const files = req.files;

  const imageUrls = {
    thumbnail: '',
    images: [],
  };

  let obj = {};

  files.forEach(list => {
    if (list.originalname === 'thumbnail') {
      imageUrls.thumbnail = list.location;
    } else {
      obj[list.originalname] = list.location;
      imageUrls.images.push(obj);
      obj = {};
    }
  });
  res.send(imageUrls);
});

app.post('/avatarimage', upload.single('img'), function async(req, res) {
  try {
    console.log('req.file: ', req.file.location);
    res.status(200).json({ avatarUrl: req.file.location });
  } catch (err) {
    res.status(500).send('err');
  }
});

/*********************** Multer code end ************************************************************
 ********************************************************************************************/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

module.exports.app = app;
