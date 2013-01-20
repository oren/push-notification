config = {
  webSitePort: 3000,
  mongoHost: 'mongodb://localhost/push',
  db: require('../db.js'),
  push: require('../push.js')
}

module.exports = config;
