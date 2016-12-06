/* global module, require */

var $ = require('jquery');

module.exports.printToConsole = function (str, consoleId) {
  var $console = $('#console');

  if (consoleId) { $console = consoleId; }
  $console.append(str + '\n');
  if($console.length) {
    $console.scrollTop($console[0].scrollHeight - $console.height());
  }
};

module.exports.printError = function (err) {
  if (err.message) {
    module.exports.printToConsole(err.message);
  } else {
    module.exports.printToConsole('ERROR: An error occurred,' +
      ' open your browser console for more details.');
  }
  console.log('ERROR:', err);
};

module.exports.printWarning = function (type, method, message) {
  module.exports.printToConsole('WARNING [' + type + '.' + method + ']: ' + message);
  throw message;
};
