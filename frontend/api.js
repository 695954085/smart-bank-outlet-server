module.exports = function api(options) {
  this.add('role:api,path:calculate', (msg, respond) => {
    respond(null, { hello: 'world' });
  });

  this.add('role:api,path:sendEmail', (msg, respond) => {
    this.act('role:email,path:sendEmail', (error, result) => {
      respond(null, result);
    });
  });

  this.add('init:api', (msg, respond) => {
    this.act('role:web', {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
          calculate: { GET: true },
          sendEmail: { GET: true },
        },
      },
    });
    respond();
  });
};
