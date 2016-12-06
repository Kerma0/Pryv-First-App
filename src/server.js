/* global require */

var http = require('http'),
  logger = require('winston'),
  fs = require('fs');

var app = require('./app'),
  config = require('../config');

if (!config.http || !config.http.ip || !config.http.port) {
  return console.error('Wrong data in field \'http\' in \'src/config.json\', please read README.');
} else if (!config.pryv || !config.pryv.domain || !config.pryv.permissions) {
  return console.error('Wrong data in field \'pryv\' in \'src/config.json\', please read README.');
}

if (!fs.existsSync(__dirname + '/../dist/')) {
  return console.log('WARNING: Run \'npm run grunt\' to build the app.');
}

var server = http.createServer(app);

server.listen(config.http.port, config.http.ip, function () {
  logger.info('Example app listening on: http://' + config.http.ip + ':' + config.http.port);
}).on('error', function (err) {
  logger.error('Failed to listen on ' + config.http.ip + ':' + config.http.port + ': ' + err);
  throw new Error(err);
});
