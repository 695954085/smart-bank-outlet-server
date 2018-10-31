const nodemailer = require('nodemailer');

module.exports = function email() {
  this.add('role:email,path:sendEmail', (msg, respond) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.agree.com.cn',
      port: 25,
      secure: false,
      auth: {
        user: 'xiachiquan@agree.com.cn',
        pass: '',
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: 'xiachiquan@agree.com.cn',
      to: 'xiachiquan@agree.com.cn',
      subject: 'Hello',
      text: 'Hello World',
      html: '<b>Hello World?</b>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sned: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      respond(null, { result: 'ok' });
    });
  });
};
