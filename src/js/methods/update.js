/* global require, module */

var binding = require('../binding.js'),
  func = require('../function');

module.exports = {
  updateEventWithId: function (connection, text, id) {
    if (!connection) { throw 'Sign in first'; }
    if (!text) { throw 'Enter a content'; }
    if (!id) { throw 'Enter an id'; }
    binding.printToConsole('Updating event...', false);
    func.updateEvent(connection, id, text, function (err, id) {
      if (err) { return console.error('Error: ' + JSON.stringify(err)); }
      binding.printToConsole('Event updated: ' + id);
    });
  },
  updateLastEvent: function (connection, text) {
    if (!connection) { throw 'Sign in first'; }
    if (!text) { throw 'Enter a content'; }
    func.getNEvent(connection, 1, function (err, event) {
      if (err) { return console.error('Error: ' + JSON.stringify(err)); }
      if (event.length === 0) { throw 'There is no event'; }
      module.exports.updateEventWithId(connection, text, event[0].id);
    });
  }
};
