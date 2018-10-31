module.exports = {
  apps: [{
    name: 'email',
    script: './email/index.js',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }, {
    name: 'frontend',
    script: './frontend/index.js',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    production: {
      user: 'root',
      host: ['104.238.185.118'],
      ref: 'origin/master',
      repo: 'git@github.com:695954085/smart-bank-outlet-server.git',
      path: '/home/workspace',
      'post-deploy': 'yarn install && pm2 reload ecosystem.config.js --env production',
      ssh_options: 'StrictHostKeyChecking=no',
    },
  },
};
