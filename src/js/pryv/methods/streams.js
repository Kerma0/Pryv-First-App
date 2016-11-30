/* global module, require */

var $ = require('jquery'),
  _ = require('lodash');

var print = require('../../utils/print'),
  parsing = require('../../utils/parsing'),
  display = require('../../utils/display');

module.exports.createStream = function (connection) {
  var $parentId = $('#streamCreateParentId'),
    $name = $('#streamCreateName'),
    $id = $('#streamCreateId');

  if (parsing.isValidParams({
      method: 'create',
      type: 'streams',
      vars: [
        connection,
        $name.val()
      ],
      messages : [
        'You must sign in first.',
        'You must enter a name.'
      ]
    }) === false) { return; }
  var streamData = { name: $name.val() };
  if ($id.val()) { _.assign(streamData, { id: $id.val() }); }
  if ($parentId.val()) { _.assign(streamData, { parentId: $parentId.val() }); }
  print.printToConsole('Creating stream...');
  connection.streams.create(streamData, function (err, streamCreated) {
    if (err) { return print.printError(err); }
    print.printToConsole('Stream ' + streamCreated.name + ' created with the ' +
      'following id: ' + streamCreated.id + '.');
  });
};
  

module.exports.updateStream = function (connection) {
  var $parentId = $('#streamUpdateParentId'),
    $name = $('#streamUpdateName'),
    $streamId = $('#streamChoiceForStreamUpdate option:selected');

  if (parsing.isValidParams({
      method: 'update',
      type: 'streams',
      vars: [
        connection,
        $name.val(),
        $streamId.val()
      ],
      messages : [
        'You must sign in first.',
        'You must enter a name.',
        'You must select a streamId.'
      ]
    }) === false) { return; }
  var streamData = {
    name: $name.val(),
    id: $streamId.val(),
    parentId: null
  };
  if ($parentId.val()) { streamData.parentId = $parentId.val(); }
  print.printToConsole('Updating stream...');
  connection.streams.update(streamData, function (err, streamUpdated) {
    if (err) { return print.printError(err); }
    print.printToConsole('Stream ' + streamUpdated.id + ' has been updated.');
  });
};

module.exports.getStream = function (connection) {
  var $parentId = $('#streamGetParentId'),
    $choice = $('#includeTrashed:checked');

  if (parsing.isValidParams({
      method: 'get',
      type: 'streams',
      vars: [ connection ],
      messages : [ 'You must sign in first.' ]
    }) === false) { return; }
  var option = { state: null };
  if ($choice.length === 1) { option.state = 'all'; }
  if ($parentId.val()) { _.assign(option, { parentId: $parentId.val() }); }
  print.printToConsole('Displaying streams...');
  connection.streams.get(option, function (err, streamList) {
    if (err) { return print.printError(err); }
    if (streamList.length === 0) { print.printToConsole('...there is no stream.'); }
    streamList.forEach(function (stream, i) {
      if (i === streamList.length - 1) {
        display.displayStreamData(stream, 'end');
      } else {
        display.displayStreamData(stream);
      }
    });
  });
};

module.exports.deleteStream = function(connection) {
  var $streamId = $('#streamDeleteId'),
    $choice = $('#mergeEvents:checked');

  if (parsing.isValidParams({
      method: 'delete',
      type: 'streams',
      vars: [
        connection,
        $streamId.val()
      ],
      messages : [
        'You must sign in first.',
        'You must enter a streamId.'
      ]
    }) === false) { return; }
  var mergeEventsWithParent = false;
  var streamData = { id: $streamId.val() };
  if ($choice.length === 1) { mergeEventsWithParent = true; }
  print.printToConsole('Deleting stream...');
  connection.streams.delete(streamData, function (err, streamDeleted) {
    if (err) { return print.printError(err); }
    if (!streamDeleted) {
      print.printToConsole('Stream has been completely deleted.');
    } else {
      print.printToConsole('Stream ' + streamDeleted.id + ' trashed.');
    }
  }, mergeEventsWithParent);
};