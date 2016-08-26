/* global require, module */

var binding = require('../../binding.js');

module.exports = {
  createEvent: function (connection, text, streamId) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!streamId) { binding.printWarning('You must choose a stream'); }
    if (text === null) { binding.printWarning('Enter a content.'); }

    var eventData = {
      streamId: streamId,
      type: 'note/txt',
      content: text
    };

    binding.printToConsole('Creating event...');
    connection.events.create(eventData, function (err, eventCreated) {
      if (err) { return binding.printError(err); }
      binding.printToConsole('Event ' + eventCreated.id + ' created.');
    });
  }
};