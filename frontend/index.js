const SenecaWeb = require('seneca-web');
const Express = require('express');
const adapter = require('seneca-web-adapter-express');
const bodyParser = require('body-parser');

const senecaWebConfig = {
  context: Express(),
  adapter,
  options: { parseBody: false },
};

const seneca = require('seneca')()
  .use(SenecaWeb, senecaWebConfig)
  .use('api')
  .client({ port: 3001, timeout: 100000 })
  .ready(() => {
    seneca
      .export('web/context')()
      .use(bodyParser.json())
      .listen(3000);
  });
