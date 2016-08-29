/* global require */

var binding = require('../js/binding.js'),
  Pryv = require('pryv');

Pryv.Event.prototype.displayEventChange = function (action) {
  var message = '.  Event: ' + action.toUpperCase() + '\t' +
    this.id + '\t' + this.streamId + '\t' + this.type + '\t' +
    this.content;
  if (this.trashed) {
    message += ' (trashed)';
  }
  binding.printToMonitor(message);
};

Pryv.Stream.prototype.displayStreamChange = function (action) {
  var message = '. Stream: ' + action.toUpperCase() + '\t' + this.id + '\t' +
    this.name + '\t' + this.parentId;
  if (this.trashed) { message += ' (trashed)'; }
  binding.printToMonitor(message);
};

Pryv.Stream.prototype.displayStreamData = function () {
  binding.printToConsole('\t{ name: ' + this.name);
  binding.printToConsole('\t  id: ' + this.id);
  binding.printToConsole('\t  trashed: ' + this.trashed);
  binding.printToConsole('\t  parentId: ' + this.parentId);
  if (this.childrenIds) {
    if (this.childrenIds.length === 0) {
      binding.printToConsole('\t  childrenIds: [] }');
    }
    else {
      this.childrenIds.forEach(function (childrenId, i, array) {
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

Pryv.Event.prototype.displayEventData = function () {
  binding.printToConsole('\t{ streamId: ' + this.streamId + '\n' +
    '\t  type: ' + this.type + '\n' +
    '\t  content: ' + this.content + '\n' +
    '\t  trashed: ' + this.trashed + '\n' +
    '\t  tags: ' + this.tags + '\n' +
    '\t  time: ' + this.time + '\n' +
    '\t  id: ' + this.id  + ' }');
};
