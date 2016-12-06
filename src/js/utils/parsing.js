/* global module, require */

/* jshint ignore:start */
var pryv = require('pryv');
/* jshint ignore:end */

var print = require('./print'),
  config = require('../../../config.json');

module.exports.isValidParams = function (parsData) {
  for (var i = 0; i < parsData.vars.length; i++) {
    if (!parsData.vars[i]) {
      print.printWarning(parsData.type, parsData.method, parsData.messages[i]);
      return false;
    } else if (parsData[i] && Number.isInteger(parsData[i]) === true && parsData[i] < 0) {
      return false;
    }
  }
  return true;
};

module.exports.parsUrl = function () {
  var params = {
    /* jshint ignore:start */
    token: pryv.utility.urls.parseClientURL().parseQuery()['token'],
    domain: pryv.utility.urls.parseClientURL().parseQuery()['pryv-domain'],
    username: pryv.utility.urls.parseClientURL().parseQuery()['username']
    /* jshint ignore:end */
  };

  if (!params.domain) {
    params.domain = config.pryv.domain;
  }

  if (params.token && !params.username) {
    return print.printError(
      { message: 'You must provide a username in the url params, please read README.' });
  } else if (!params.token && params.username) {
    return print.printError(
      { message: 'You must provide a token in the url params, please read README.'});
  } else {
    return params;
  }
};