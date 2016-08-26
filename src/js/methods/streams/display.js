/* global require, module */

var binding = require('../../binding.js'),
  utility = require('../../../util/utility.js'),
  _ = require('lodash');

module.exports = {
  displayStream: function (connection, stream) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!stream.active.value ||
      (stream.active.value.toLowerCase() !== 'yes' &&
      stream.active.value.toLowerCase() !== 'no')) {
      binding.printWarning('Answer by yes or no');
    }

    var option = { state: null };
    if (stream.active.value.toLowerCase() === 'yes') { option.state = 'all'; }
    if (stream.parentId.value) { _.assign(option, { parentId: stream.parentId.value }); }

    binding.printToConsole('Displaying streams...');
    connection.streams.get(option, function (err, streamList) {
      if (err) { return binding.printError(err); }
      if (streamList.length === 0) { binding.printWarning('There is no stream.'); }
      streamList.forEach(function (stream, i) {
        binding.printToConsole('Stream ' + (i + 1) + ':');
        utility.displayStreamData(stream);
      });
    });
  }
};