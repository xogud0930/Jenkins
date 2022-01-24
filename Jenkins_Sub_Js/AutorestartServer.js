const request = require('request');
const shell = require('shelljs');
const logger = require('./config/winston')

const getRequest = (url, server) => {
  request.get({
    headers: {'content-type': 'application/json'},
    uri: url,
    json: true
  }, function(err, res, body) {
    if(err) {
      logger.error(`Restarting ${server} server...`);
      shell.exec(`pm2 restart ${server}`);

      return 0;
    }
    logger.info(`${server} ${res.statusCode}`);
  });
}

logger.info('AutorestartServer.js started');


const timeCheck = () => {
  if(new Date().getSeconds() === 0) {
    getRequest('https://stg.mommoss.com:3101/mommoss-mail/api-docs/', 'mail-server');
    getRequest('https://stg.mommoss.com:3102/sunflower-care/api-docs/', 'sunflower-server');
  }
}

setInterval(() => {
  timeCheck();
}, 1000);