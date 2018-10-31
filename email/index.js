const seneca = require('seneca')();

seneca.use('api').listen({ port: 3001, timeout: 20000 })
;