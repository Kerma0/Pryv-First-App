/* global require, module */

var binding = require('../binding.js'),
  func = require('../function');

module.exports = {
  deleteNLastEvent: function(connection, n) {
    n = Number(n);
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (Number.isInteger(n) === false || n <= 0) {
      binding.printWarning('Enter a strictly positive value.');
    }
    if (n === 1) { binding.printToConsole('Deleting ' + n + ' event...'); }
    else { binding.printToConsole('Deleting ' + n + ' events...'); }
    func.getNEvent(connection, n, function (err, event) {
      if (err) { return binding.printError(err); }
      if (event.length === 0) { binding.printWarning('There is no event.'); }
      event.forEach(function (eventData) {
        func.deleteEvent(connection, eventData, function (err) {
          if (err) { return binding.printError(err); }
        });
      });
    });
  }
};