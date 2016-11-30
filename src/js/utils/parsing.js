/* global module, require */

var print = require('./print');

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