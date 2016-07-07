/* global require, module */

var binding = require('../binding.js'),
  func = require('../function');

module.exports = {
  deleteEventWithId: function (connection, id) {
    if (!connection) { throw 'Sign in first'; }
    func.deleteEvent(connection, id, function (err, id) {
      if (err) { return console.error('Error: ' + JSON.stringify(err)); }
      binding.printToConsole('Event ' + id + ' deleted.');
    });
  },
  deleteNLastEvent: function(connection, n, id) {
    if (!connection) { throw 'Sign in first'; }
    if (!id && !n) { throw 'Enter at least a number or an id'; }
    if (id && n) { throw 'Enter a number or an id, not both'; }
    if (!id && n) {
      n = Number(n);
      if (Number.isInteger(n) === false || n <= 0) { throw 'Enter a strictly positive value'; }
      if (n === 1) { binding.printToConsole('Deleting ' + n + ' event...'); }
      else { binding.printToConsole('Deleting ' + n + ' events...'); }
      func.getNEvent(connection, n, function (err, event) {
        if (err) { return console.error('Error: ' + JSON.stringify(err)); }
        if (event.length === 0) { throw 'There is no event'; }
        event.forEach(function (eventData) {
          module.exports.deleteEventWithId(connection, eventData.id);
        });
      });
    }
    else {
      binding.printToConsole('Deleting event ' + id);
      module.exports.deleteEventWithId(connection, id);
      return 0;
    }
  }
};