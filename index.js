const fs = require('fs');
const https = require('https');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');

const cookieParser = require('cookie-parser');

const KEY = 'key.pem';
const CERT = 'cert.pem';

const privateKey = fs.readFileSync(
  '/home/yongjay/Documents/certAndKey' + `/` + KEY,
  'utf8',
);
const certificate = fs.readFileSync(
  '/home/yongjay/Documents/certAndKey' + `/` + CERT,
  'utf8',
);
const credentials = { key: privateKey, cert: certificate };

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['https://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
);
app.use(cookieParser());
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, () => console.log('server runnning'));

module.exports = httpsServer;
