/* global module, require */

var $ = require('jquery');

var print = require('./print');

module.exports.displayEventChange = function (event, action) {
  var message = '.  EVENT: ' + action.toUpperCase() + '\t' +
    event.id + '\t' + event.streamId + '\t' + event.type + '\t' +
    event.content;

  if (event.trashed) { message += ' (trashed)'; }
  print.printToConsole(message, $('#monitor'));
};

module.exports.displayStreamChange = function (stream, action) {
  var message = '. STREAM: ' + action.toUpperCase() + '\t' + stream.id + '\t' +
    stream.name + '\t' + stream.parentId;
  if (stream.trashed) { message += ' (trashed)'; }
  print.printToConsole(message, $('#monitor'));
};

module.exports.displayStreamData = function (stream, end) {
  var message = JSON.stringify({
    id: stream.id,
    name: stream.name,
    trashed: stream.trashed,
    parentId: stream.parentId,
    childrenIds: stream.childrenIds
  }, null, '  ');
  if (!end) { message += ','; }
  print.printToConsole(message);
};

module.exports.displayEventData = function (event, end) {
  var message = JSON.stringify({
    id: event.id,
    type: event.type,
    content: event.content,
    trashed: event.trashed,
    streamId: event.streamId
  }, null, '  ');
  if (!end) { message += ','; }
  print.printToConsole(message);
};

module.exports.displayAccessData = function (access, end) {
  var message = JSON.stringify({
    id: access.id,
    name: access.name,
    type: access.type,
    token: access.token,
    permissions: access.permissions
  }, null, '  ');
  if (!end) { message += ','; }
  print.printToConsole(message);
};