/* global require, module */

var binding = require('../../binding.js'),
  Pryv = require('pryv');

module.exports = {
  displayEvent: function (connection, n, streamId) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!streamId) { binding.printWarning('You must choose a stream'); }

    n = Number(n);
    var filter = new Pryv.Filter({
      streams: [ streamId ],
      limit: n
    });

    if (Number.isInteger(n) === false || n <= 0) {
      binding.printWarning('Enter a strictly positive value.');
    }
    else if (n === 1) { binding.printToConsole('Displaying ' + n + ' event...'); }
    else { binding.printToConsole('Displaying ' + n + ' events...'); }

    connection.events.get(filter, function (err, eventList) {
      if (err) { return binding.printError(err); }
      if (eventList.length === 0) { binding.printWarning('There is no event.'); }
 
      eventList.forEach(function (event, i) {
        binding.printToConsole('Event ' + (i + 1) + ':');
        event.displayEventData(event);
      });
    });
  }
};