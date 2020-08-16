// https://blog.naver.com/PostView.nhn?blogId=dilrong&logNo=221423928067
const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const express = require('express');

const router = express.Router();

const options = {
  //swagger문서 설정
  swaggerDefinition: {
    openapi: '3.0.3',
    servers: [
      {
        url: 'http://localhost:3000/api/',
        description: 'local',
      },
      {
        url: 'http://13.125.78.90/api/',
        description: 'deploy server',
      },
    ],
    info: {
      title: 'Roadrunner Server API Doc',
      version: '1.0.0',
      description: 'Roadrunner server API Doc,',
    },
    host: 'localhost:3000',
    components: {
      securitySchemes: {
        JWT: {
          description: '',
          type: 'apiKey',
          name: 'authorization',
          in: 'header',
        },
      },
    },
  },
  //swagger api가 존재하는 곳
  apis: ['./controllers/*.js', './models/*.js', './middlewares/*.js', './routes/*.js'],
};

const specs = swaggereJsdoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
