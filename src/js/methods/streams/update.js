/* global require, module */

var binding = require('../../binding.js');

module.exports = {
  updateStream: function (connection, stream) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!stream.name.value) { binding.printWarning('Enter a name'); }
    if (!stream.id.value) { binding.printWarning('Enter an id'); }

    var streamData = {
      name: stream.name.value,
      id: stream.id.value,
      parentId: null
    };
    if (stream.parentId.value) { streamData.parentId = stream.parentId.value; }

    binding.printToConsole('Updating stream...');
    connection.streams.update(streamData, function (err, streamUpdated) {
      if (err) { return binding.printError(err); }
      binding.printToConsole('Stream ' + streamUpdated.id + ' updated.');
    });
  }
};