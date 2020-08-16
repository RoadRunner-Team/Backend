require('dotenv').config();

module.exports = {
  development: {
    username: 'ubuntu',
    password: process.env.DATABASE_PASSWORD,
    database: 'roadrunner',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'ubuntu',
    password: process.env.DATABASE_PASSWORD,
    database: 'roadrunner',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
};
