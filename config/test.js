config = {
  webSitePort: 3001,
  mongoHost: 'mongodb://localhost/push',
  db: require('../mockDb.js'), 
  push: require('../mockPush.js')
}

module.exports = config;
