/* global require, module */

var binding = require('../../binding.js'),
  _ = require('lodash');

module.exports = {
  createStream: function (connection, stream) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!stream.name.value) { binding.printWarning('Enter at least a name.'); }

    var streamData = { name: stream.name.value };
    if (stream.id.value) { _.assign(streamData, { id: stream.id.value }); }
    if (stream.parentId.value) {
      _.assign(streamData, { parentId: stream.parentId.value });
    }

    binding.printToConsole('Creating stream...');
    connection.streams.create(streamData, function (err, streamCreated) {
      if (err) { return binding.printError(err); }
      binding.printToConsole('Stream ' + streamCreated.name + ' created with the ' +
        'following id: ' + streamCreated.id + '.');
    });
  }
};