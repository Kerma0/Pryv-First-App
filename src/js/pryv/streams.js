/* global module, require */

var $ = require('jquery'),
  _ = require('lodash');

var display = require('../utils/display');

module.exports.createStream = function (connection) {
  var $parentId = $('#streamCreateParentId'),
    $name = $('#streamCreateName'),
    $id = $('#streamCreateId');

  if (!connection) {
    return display.printWarning('stream', 'create', 'You must sign in first.');
  }
  if (!$name.val()) {
    return display.printWarning('stream', 'create', 'You must enter a name.');
  }

  var streamData = { name: $name.val() };
  if ($id.val()) { _.assign(streamData, { id: $id.val() }); }
  if ($parentId.val()) {
    _.assign(streamData, { parentId: $parentId.val() });
  }

  display.printToConsole('Creating stream...');
  connection.streams.create(streamData, function (err, streamCreated) {
    if (err) { return display.printError(err); }
    display.printToConsole('Stream ' + streamCreated.name + ' created with the ' +
      'following id: ' + streamCreated.id + '.');
  });
};
  

module.exports.updateStream = function (connection) {
  var $parentId = $('#streamUpdateParentId'),
    $name = $('#streamUpdateName'),
    $streamId = $('#streamChoiceForStreamUpdate option:selected');

  if (!connection) {
    return display.printWarning('stream', 'update', 'You must sign in first.');
  }
  if (!$name.val()) {
    return display.printWarning('stream', 'update', 'You must enter a name.');
  }
  if (!$streamId.val()) {
    return display.printWarning('stream', 'update', 'You must select a streamId.');
  }

  var streamData = {
    name: $name.val(),
    id: $streamId.val(),
    parentId: null
  };
  if ($parentId.val()) { streamData.parentId = $parentId.val(); }

  display.printToConsole('Updating stream...');
  connection.streams.update(streamData, function (err, streamUpdated) {
    if (err) { return display.printError(err); }
    display.printToConsole('Stream ' + streamUpdated.id + ' has been updated.');
  });
};

module.exports.getStream = function (connection) {
  var $parentId = $('#streamGetParentId'),
    $choice = $('#includeTrashed:checked');

  if (!connection) {
    return display.printWarning('stream', 'get', 'You must sign in first.');
  }

  var option = { state: null };
  if ($choice.length === 1) { option.state = 'all'; }
  if ($parentId.val()) { _.assign(option, { parentId: $parentId.val() }); }

  display.printToConsole('Displaying streams...');
  connection.streams.get(option, function (err, streamList) {
    if (err) { return display.printError(err); }
    if (streamList.length === 0) { display.printToConsole('...there is no stream.'); }
    streamList.forEach(function (stream, i) {
      display.printToConsole('Stream ' + (i + 1) + ':');
      display.displayStreamData(stream);
    });
  });
};

module.exports.deleteStream = function(connection) {
  var $streamId = $('#streamDeleteId'),
    $choice = $('#mergeEvents:checked');

  if (!connection) {
    return display.printWarning('stream', 'delete', 'You must sign in first.');
  }
  if (!$streamId.val()) {
    return display.printWarning('stream', 'update', 'You must enter a streamId.');
  }
  
  var mergeEventsWithParent = false;
  var streamData = { id: $streamId.val() };
  if ($choice.length === 1) { mergeEventsWithParent = true; }

  display.printToConsole('Deleting stream...');
  connection.streams.delete(streamData, function (err, streamDeleted) {
    if (err) { return display.printError(err); }
    if (!streamDeleted) {
      display.printToConsole('Stream has been completely deleted.');
    } else {
      display.printToConsole('Stream ' + streamDeleted.id + ' trashed.');
    }
  }, mergeEventsWithParent);
};