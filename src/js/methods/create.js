/* global require, module */

var binding = require('../binding.js'),
  func = require('../function.js');

module.exports = {
  createNoteEvent: function (connection, text) {
    if (!connection) { throw 'Sign in first'; }
    if (text === null) { throw 'Enter a content'; }
    binding.printToConsole('Creating event...');
    func.createEvent(connection, text, function (err, id) {
      if (err) { return console.error('Error: ' + JSON.stringify(err)); }
      binding.printToConsole('Event created: ' + id);
    });
  }
};