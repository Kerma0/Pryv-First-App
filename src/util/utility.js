/* global module, require */

var binding = require('../js/binding.js');

module.exports = {
  displayAccessInfo: function (connection) {
    connection.accessInfo(function (err, info) {
      if (err) {
        binding.area.accessInfo.value = 'Something went wrong while loading Access Info.';
        return console.error(err);
      }
      binding.area.accessInfo.value = JSON.stringify(info, null, 2);
    });
  },
  displayStreamTree: function (connection) {
    connection.streams.get(null, function(err, streams) {
      if (err) {
        binding.area.streams.value = 'Something went wrong while loading Streams.';
        return console.error(err);
      }
      binding.area.streams.value = JSON.stringify(
        connection.streams.getDisplayTree(streams), null, 2);
    });
  },
  displayStreamData: function (stream) {
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
  },
  displayEventData: function (event) {
    binding.printToConsole('\t{ streamId: ' + event.streamId + '\n' +
      '\t  type: ' + event.type + '\n' +
      '\t  content: ' + event.content + '\n' +
      '\t  trashed: ' + event.trashed + '\n' +
      '\t  tags: ' + event.tags + '\n' +
      '\t  time: ' + event.time + '\n' +
      '\t  id: ' + event.id  + ' }');
  },
  displayEventChange: function (action, event) {
    var message = '.  Event: ' + action.toUpperCase() + '\t' +
      event.id + '\t' + event.streamId + '\t' + event.type + '\t' +
      event.content.substring(0, 30);
    if (event.trashed) {
      message += ' (trashed)';
    }
    binding.printToMonitor(message);
  },
  displayStreamChange: function (action, stream) {
    var message = '. Stream: ' + action.toUpperCase() + '\t' + stream.id + '\t' +
      stream.name + '\t' + stream.parentId;
    if (stream.trashed) { message += ' (trashed)'; }
    binding.printToMonitor(message);
  }
};
