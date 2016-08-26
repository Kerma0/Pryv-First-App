/* global require, module */

var binding = require('../../binding.js'),
  Pryv = require('pryv');

module.exports = {
  deleteEvent: function(connection, n, streamId) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!streamId) { binding.printWarning('You must choose a stream'); }

    n = Number(n);
    var filter = new Pryv.Filter({
      streams: [ streamId ],
      limit: n
    });

    if (Number.isInteger(n) === false || n <= 0) {
      binding.printWarning('Enter a strictly positive value.');
    }
    if (n === 1) { binding.printToConsole('Deleting ' + n + ' event...'); }
    else { binding.printToConsole('Deleting ' + n + ' events...'); }

    connection.events.get(filter, function (err, eventList) {
      if (err) { return binding.printError(err); }
      if (eventList.length === 0) { binding.printWarning('There is no event.'); }

      eventList.forEach(function (event) {
        connection.events.delete(event, function (err, eventDeleted) {
          if (err) { return binding.printError(err); }
          binding.printToConsole('Event ' + eventDeleted.id + ' deleted.');
        });
      });
    });
  }
};
