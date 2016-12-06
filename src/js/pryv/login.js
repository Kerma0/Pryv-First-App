/* global module, require */

var pryv = require('pryv');
  
var info = require('./info'),
  monitor = require('./monitor'),
  print = require('../utils/print'),
  manage = require('../utils/manage'),
  parsing = require('../utils/parsing'),
  config = require('../../../config.json');

module.exports.pryvLogin = function (callback) {
  var connection = null,
    settings = {
      requestingAppId: 'javascript-example-app',
      requestedPermissions: config.pryv.permissions,
      returnURL: false,
      spanButtonID: 'pryv-button',
      callbacks: {
        initialization: function () {
          manage.resetAll(function () {
            print.printToConsole('-> Authentication initialized...');
          });
        },
        needSignin: function (popupUrl, pollUrl, pollRateMs) {
          print.printToConsole('...please sign-in...');
          if (!popupUrl || !pollUrl || !pollRateMs) {
            print.printError('Something went wrong while trying to authenticate.' + '\n');
          }
        },
        signedIn: function (settings) {
          connection = new pryv.Connection(settings);
          info.showAccessInfo(connection);
          connection.fetchStructure(function (err) {
            if (err) { return print.printError(err); }
            print.printToConsole('...access granted for user ' + settings.username +
              ' with following token: ' +  settings.auth + '.');
            info.showStreamTree(connection);
            monitor.setupMonitor(connection);
            callback(connection);
          });
        },
        refused: function (code) {
          print.printToConsole('...access refused: ' + code + '\n');
        },
        error: function (code, message) {
          print.printToConsole('...error [' + code + ']: ' + message + '\n');
        }
      }
    },
    urlParams = parsing.parsUrl();

  if (urlParams && urlParams.token && urlParams.username) {
    var authSettings = {
      username: urlParams.username,
      domain: urlParams.domain.substring(0, 4) !== 'reg.' ?
      urlParams.domain : urlParams.domain.substring(4, urlParams.domain.length),
      auth: urlParams.token
    };
    connection = new pryv.Connection(authSettings);
    info.showAccessInfo(connection);
    connection.fetchStructure(function (err) {
      if (err) { return print.printError(err); }
      print.printToConsole('...access granted for user ' + settings.username +
        ' with following token: ' +  settings.auth + '.');
      info.showStreamTree(connection);
      monitor.setupMonitor(connection);
      callback(connection);
    });
  } else if (urlParams) {
    pryv.Auth.config.registerURL.host =
      urlParams.domain.substring(0, 4) !== 'reg.' ?
      'reg.' + urlParams.domain : urlParams.domain ;
    pryv.Auth.setup(settings);
  } else {
    callback();
  }
};
