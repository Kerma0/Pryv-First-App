/* global require, module */

var binding = require('../binding.js'),
  func = require('../function.js');

module.exports = {
  createNoteEvent: function (connection, text) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (text === null) { binding.printWarning('Enter a content.'); }
    var eventData = {
      streamId: 'ExampleApp',
      type: 'note/txt',
      content: text
    };
    binding.printToConsole('Creating event...');
    func.createEvent(connection, eventData, function (err) {
      if (err) { return binding.printError(err); }
    });
  }
};