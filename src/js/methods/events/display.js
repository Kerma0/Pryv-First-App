/* global require, module */

var binding = require('../../binding.js'),
  func = require('../../function.js');

function displayEventData (event) {
  binding.printToConsole('\t{ streamId: ' + event.streamId + '\n' +
    '\t  type: ' + event.type + '\n' +
    '\t  content: ' + event.content + '\n' +
    '\t  trashed: ' + event.trashed + '\n' +
    '\t  tags: ' + event.tags + '\n' +
    '\t  time: ' + event.time + '\n' +
    '\t  id: ' + event.id  + ' }');
}

module.exports = {
  displayEvent: function (connection, n, streamId) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!streamId) { binding.printWarning('You must choose a stream'); }
    n = Number(n);
    if (Number.isInteger(n) === false || n <= 0) {
      binding.printWarning('Enter a strictly positive value.');
    }
    else if (n === 1) { binding.printToConsole('Displaying ' + n + ' event...'); }
    else { binding.printToConsole('Displaying ' + n + ' events...'); }
    func.events.get(connection, n, streamId, function (err, eventList) {
      if (err) { return binding.printError(err); }
      if (eventList.length === 0) { binding.printWarning('There is no event.'); }
      eventList.forEach(function (event, i) {
        binding.printToConsole('Event ' + (i + 1) + ':');
        displayEventData(event);
      });
    });
  }
};