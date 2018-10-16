const SenecaWeb = require('seneca-web');
const Express = require('express');

const senecaWebConfig = {
  context: Express(),
  adapter: require('seneca-web-adapter-express'),
  options: { parseBody: false },
};

const seneca = require('seneca')()
  .use(SenecaWeb, senecaWebConfig)
  .use('api')
  .client({ port: 3001, timeout: 100000 })
  .ready(function() {
    const server = seneca
      .export('web/context')()
      .use(require('body-parser').json())
      .listen(3000);
  });
