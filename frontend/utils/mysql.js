import Sequelize from 'sequelize';
import util from 'util';
import logger from '../../config/winston';

const sequelize = new Sequelize('smart', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize.authenticate().then(() => {
  logger.info('Connection has been established successfully.');
}).catch((err) => {
  logger.log('error', util.format('Unable to connect to the database: %O', err));
});

export default sequelize;
