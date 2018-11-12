import util from 'util';
import bcrypt from 'bcrypt';
import formidable from 'formidable';
import logger from '../config/winston';
import User from './utils/models/User';

module.exports = function api() {
  // 登录
  // eslint-disable-next-line
  this.add('role:api,path:login', function(msg, respond) {
    const form = new formidable.IncomingForm();
    form.parse(msg.request$, (err, fields) => {
      if (err) {
        logger.error('form-data解析失败');
        respond('form-data解析失败');
        return;
      }
      const { userName, password } = fields;
      User.findOne({ where: { userName } })
        .then(
          async (user) => {
            if (user) {
              return Promise.reject(util.format('用户名已存在: %s', userName));
            }
            // 正式注册用户
            const salt = await bcrypt.genSalt();
            const newPassword = await bcrypt.hash(password, salt);
            return User.create({
              userName,
              password: newPassword,
            });
          },
          (error) => {
            logger.error(util.format('数据库异常: %s', error.message));
            respond({ error: util.format('数据库异常: %s', error.message) });
          },
        )
        .then(
          (user) => {
            logger.info(util.format('成功注册: %s', user.userName));
            respond({ result: util.format('成功注册：%s', user.userName) });
            // 发送注册成功email
            this.act(
              util.format(
                'role:email,path:sendEmail,message:%s',
                user.userName,
              ),
              (error, result) => {
                if (error) {
                  logger.error(util.format('%s 邮件发送失败', user.userName));
                  return;
                }
                logger.info(util.format('%s 邮件发送成功', result));
              },
            );
          },
          (error) => {
            logger.error(util.format('%o', error));
            if (typeof error === 'string') {
              respond(null, { error });
              return;
            }
            respond(null, { error: error.message });
          },
        );
    });
  });

  // eslint-disable-next-line
  this.add('init:api', function(msg, respond) {
    this.act('role:web', {
      routes: [
        {
          prefix: '/v1',
          pin: 'role:api,path:*',
          map: {
            login: { POST: true },
          },
        },
      ],
    });
    respond();
  });
};
