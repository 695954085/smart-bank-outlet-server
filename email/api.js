import nodemailer from 'nodemailer';
import util from 'util';
import logger from '../config/winston';

module.exports = function email() {
  this.add('role:email,path:sendEmail', (msg, respond) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.agree.com.cn',
      port: 25,
      secure: false,
      auth: {
        user: '',
        pass: '',
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: '',
      to: `${msg.message}@xxx`,
      subject: '注册',
      text: '注册成功',
      html: '<b>注册成功</b>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error(util.format('%s', error.message));
        respond(error);
        return;
      }
      logger.info('Message sned: %s', info.messageId);
      logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      respond(null, { result: 'ok' });
    });
  });
};
