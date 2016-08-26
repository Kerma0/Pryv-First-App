/* global module, require */

var binding = require('../js/binding.js');

var Format = module.exports = Object;

Format.prototype.displayEventChange = function (action, event) {
  var message = '.  Event: ' + action.toUpperCase() + '\t' +
    event.id + '\t' + event.streamId + '\t' + event.type + '\t' +
    event.content.substring(0, 30);
  if (event.trashed) {
    message += ' (trashed)';
  }
  binding.printToMonitor(message);
};

Format.prototype.displayStreamChange = function (action, stream) {
  var message = '. Stream: ' + action.toUpperCase() + '\t' + stream.id + '\t' +
    stream.name + '\t' + stream.parentId;
  if (stream.trashed) { message += ' (trashed)'; }
  binding.printToMonitor(message);
};

Format.prototype.displayStreamData = function (stream) {
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
};

Format.prototype.displayEventData = function (event) {
  binding.printToConsole('\t{ streamId: ' + event.streamId + '\n' +
    '\t  type: ' + event.type + '\n' +
    '\t  content: ' + event.content + '\n' +
    '\t  trashed: ' + event.trashed + '\n' +
    '\t  tags: ' + event.tags + '\n' +
    '\t  time: ' + event.time + '\n' +
    '\t  id: ' + event.id  + ' }');
};
