/* global require, module */

var binding = require('../binding.js'),
  func = require('../function.js');

function displayEventData (event) {
  binding.printToConsole('{ streamId: ' + event.streamId + '\n' +
    '  type: ' + event.type + '\n' +
    '  content: ' + event.content + '\n' +
    '  trashed: ' + event.trashed + '\n' +
    '  tags: ' + event.tags + '\n' +
    '  time: ' + event.time + '\n' +
    '  id: ' + event.id + '\n' +
    '  created: ' + event.created + '\n' +
    '  createdBy: ' + event.createdBy + '\n' +
    '  modified: ' + event.modified + '\n' +
    '  modifiedBy: ' + event.modifiedBy + ' }');
}

module.exports = {
  displayNLastEvents: function (connection, n) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    n = Number(n);
    if (Number.isInteger(n) === false || n <= 0) {
      binding.printWarning('Enter a strictly positive value.');
    }
    else if (n === 1) { binding.printToConsole('Displaying ' + n + ' event...'); }
    else { binding.printToConsole('Displaying ' + n + ' events...'); }
    func.getNEvent(connection, n, function (err, events) {
      if (err) { return binding.printError(err); }
      if (events.length === 0) { binding.printWarning('There is no event.'); }
      events.forEach(function (eventData, i) {
        binding.printToConsole('Event ' + (i + 1) + ':');
        displayEventData(events[i]);
      });
    });
  }
};