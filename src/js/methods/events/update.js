/* global require, module */

var binding = require('../../binding.js'),
  Pryv = require('pryv');

module.exports = {
  updateEvent: function (connection, text, streamId) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!streamId) { binding.printWarning('You must choose a stream'); }
    if (!text) { binding.printWarning('Enter a content.'); }

    var filter = new Pryv.Filter({
      streams: [ streamId ],
      limit: 1
    });

    binding.printToConsole('Updating event...');
    connection.events.get(filter, function (err, eventList) {
      if (err) { return binding.printError(err); }
      if (eventList.length === 0) { binding.printWarning('There is no event.'); }

      eventList[0].content = text;
      connection.events.update(eventList[0], function (err, eventUpdated) {
        if (err) { return binding.printError(err); }
        binding.printToConsole('Event ' + eventUpdated.id + ' updated.');
      });
    });
  }
};