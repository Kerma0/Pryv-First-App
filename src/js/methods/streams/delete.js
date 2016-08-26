/* global require, module */

var binding = require('../../binding.js');

module.exports = {
  deleteStream: function(connection, stream) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!stream.id.value) { binding.printWarning('Enter an id'); }
    if (!stream.merge.value ||
      (stream.merge.value.toLowerCase() !== 'yes' && 
      stream.merge.value.toLowerCase() !== 'no')) {
      binding.printWarning('Answer by yes or no');
    }

    var mergeEventsWithParent = false;
    var streamData = { id: stream.id.value };
    if (stream.merge.value.toLowerCase() === 'yes') { mergeEventsWithParent = true; }

    binding.printToConsole('Deleting stream...');
    connection.streams.delete(streamData, function (err, streamDeleted) {
      if (err) { return binding.printError(err); }
      if (!streamDeleted) {
        binding.printToConsole('Stream has been completely deleted.');
      }
      else {
        binding.printToConsole('Stream ' + streamDeleted.id + ' trashed.');
      }
    }, mergeEventsWithParent);
  }
};