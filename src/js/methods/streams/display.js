/* global require, module */

var binding = require('../../binding.js'),
  func = require('../../function.js'),
  _ = require('lodash');

function displayStreamData (stream) {
  binding.printToConsole('\t{ name: ' + stream.name);
  binding.printToConsole('\t  id: ' + stream.id);
  binding.printToConsole('\t  trashed: ' + stream.trashed);
  binding.printToConsole('\t  parentId: ' + stream.parentId);
  if (stream.childrenIds) {
    if (stream.childrenIds.length === 0) {
      binding.printToConsole('\t  childrenIds: [] }');
    }
    else {
      stream.childrenIds.forEach(function (childrenId, i, array) {
        if (i === 0 && array.length === 1) {
          binding.printToConsole('\t  childrenIds: [ ' + childrenId + ' ] }');
        }
        else if (i === 0 && array.length > 1) {
          binding.printToConsole('  childrenIds: [ ' + childrenId);
        }
        else if (i === array.length - 1) {
          binding.printToConsole('\t    ' + childrenId + ' ] }');
        }
        else {
          binding.printToConsole('\t    ' + childrenId);
        }
      });
    }
  }
}

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
    func.streams.get(connection, option, function (err, streamList) {
      if (err) { return binding.printError(err); }
      if (streamList.length === 0) { binding.printWarning('There is no stream.'); }
      streamList.forEach(function (stream, i) {
        binding.printToConsole('Stream ' + (i + 1) + ':');
        displayStreamData(stream);
      });
    });
  }
};