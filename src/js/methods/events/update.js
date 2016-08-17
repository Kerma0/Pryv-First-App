/* global require, module */

var binding = require('../../binding.js'),
  func = require('../../function.js');

module.exports = {
  updateEvent: function (connection, text, streamId) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!streamId) { binding.printWarning('You must choose a stream'); }
    if (!text) { binding.printWarning('Enter a content.'); }
    binding.printToConsole('Updating event...');
    func.events.get(connection, 1, streamId, function (err, eventList) {
      if (err) { return binding.printError(err); }
      if (eventList.length === 0) { binding.printWarning('There is no event.'); }
      eventList[0].content = text;
      func.events.update(connection, eventList[0], function (err, eventUpdated) {
        if (err) { return binding.printError(err); }
        binding.printToConsole('Event ' + eventUpdated.id + ' updated.');
      });
    });
  }
};