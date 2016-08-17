/* global require, module */

var binding = require('../../binding.js'),
  func = require('../../function');

module.exports = {
  deleteEvent: function(connection, n, streamId) {
    n = Number(n);
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!streamId) { binding.printWarning('You must choose a stream'); }
    if (Number.isInteger(n) === false || n <= 0) {
      binding.printWarning('Enter a strictly positive value.');
    }
    if (n === 1) { binding.printToConsole('Deleting ' + n + ' event...'); }
    else { binding.printToConsole('Deleting ' + n + ' events...'); }
    func.events.get(connection, n, streamId, function (err, eventList) {
      if (err) { return binding.printError(err); }
      if (eventList.length === 0) { binding.printWarning('There is no event.'); }
      eventList.forEach(function (event) {
        func.events.delete(connection, event, function (err, eventDeleted) {
          if (err) { return binding.printError(err); }
          binding.printToConsole('Event ' + eventDeleted.id + ' deleted.');
        });
      });
    });
  }
};