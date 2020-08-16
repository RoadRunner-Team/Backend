const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const helmet = require('helmet');
const hpp = require('hpp');

require('dotenv').config();

const { sequelize } = require('./models');
const logger = require('./logger');
const swaggerDoc = require('./swaggerDoc');
const { errorMiddleware, socketMiddleware } = require('./middlewares');

const app = express();
sequelize.sync(); // { force: true }

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.set('port', process.env.PORT || 3000);

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
} else {
  // development
  app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// socket.io for chatting server
const server = http.createServer(app);
// http server를 socket.io server로 upgrade 한다.
const io = socketio(server);
// socket event 등록
require('./socket/socket.event')(io);
// req.io = io
app.use(socketMiddleware(io));

// route
app.use(swaggerDoc); // '/api-docs'
app.use('/api', require('./routes'));

// 필수 폴더 추가
fs.mkdirSync(__dirname + '/uploads', { recursive: true });
// file url을 통하여 파일을 볼 수 있는 경로
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(errorMiddleware);

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 서버 실행중입니다.`);
});

const SOCKET_PORT = process.env.SOCKET_PORT;
server.listen(SOCKET_PORT, function () {
  console.log(`${SOCKET_PORT}번 포트에서 Socket IO 서버 실행중입니다.`);
});
