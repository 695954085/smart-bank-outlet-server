import SenecaWeb from 'seneca-web';
import Express from 'express';
import adapter from 'seneca-web-adapter-express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import api from './api';
import logger from '../config/winston';

const Routes = new Express.Router();

const senecaWebConfig = {
  routes: Routes,
  context: Express(),
  adapter,
  options: { parseBody: false }, // so we can use body-parser
};

const seneca = require('seneca')()
  .use(SenecaWeb, senecaWebConfig)
  .use(api)
  .client({ port: 3001, timeout: 100000 })
  .ready(() => {
    const app = seneca.export('web/context')();
    app.use(morgan('combined', {
      stream: logger.stream,
    })).use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json());
    app.listen(3000, () => {
      logger.info('服务器正在监听3000端口');
    });
  });
