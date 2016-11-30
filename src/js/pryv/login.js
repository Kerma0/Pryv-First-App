/* global module, require */

var pryv = require('pryv');
  
var info = require('./info'),
  monitor = require('./monitor'),
  print = require('../utils/print'),
  manage = require('../utils/manage'),
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
          callback(null);
        },
        signedIn: function (settings) {
          connection = new pryv.Connection(settings);
          connection.fetchStructure(function (err) {
            if (err) { print.printError(err); }
            print.printToConsole('...access granted for user ' + settings.username +
              ' with following token: ' +  settings.auth + '.');
            info.showStreamTree(connection);
            monitor.setupMonitor(connection);
            callback(connection);
          });
          info.showAccessInfo(connection);
        },
        refused: function (code) {
          print.printToConsole('...access refused: ' + code + '\n');
          callback(null);
        },
        error: function (code, message) {
          print.printToConsole('...error [' + code + ']: ' + message + '\n');
          callback(null);
        }
      }
    };

  pryvAuth(settings);
};


function pryvAuth(settings) {
  var domain = pryv.utility.urls.parseClientURL().parseQuery()['pryv-domain'];

  if (domain && domain.substring(0, 4) === 'reg.') {
    pryv.Auth.config.registerURL.host = domain;
  } else if (domain) {
    pryv.Auth.config.registerURL.host = 'reg.' + domain;
  } else {
    pryv.Auth.config.registerURL.host = 'reg.' + config.pryv.domain;
  }

  pryv.Auth.setup(settings);
}