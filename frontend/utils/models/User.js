import Sequelize from 'sequelize';
import sequelize from '../mysql';

const User = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.sync({ force: true });

export default User;
