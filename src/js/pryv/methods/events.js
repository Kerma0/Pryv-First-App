/* global module, require */

var $ = require('jquery'),
  pryv = require('pryv');

var print = require('../../utils/print'),
  parsing = require('../../utils/parsing'),
  display = require('../../utils/display');

module.exports.createEvent = function (connection) {
  var $streamId = $('#streamChoiceForEventManagement option:selected'),
    $type = $('#eventCreateType'),
    $content = $('#eventCreateContent');

  if (parsing.isValidParams({
      method: 'create',
      type: 'events',
      vars: [
        connection,
        $streamId.val(),
        $content.val(),
        $type.val()
      ],
      messages : [
        'You must sign in first.',
        'You must chose stream.',
        'You must enter a content.',
        'You must enter a type.'
      ]
    }) === false) { return; }
  var eventData = {
    streamId: $streamId.val(),
    type: $type.val(),
    content: $content.val()
  };
  print.printToConsole('Creating event...');
  connection.events.create(eventData, function (err, eventCreated) {
    if (err) { return print.printError(err); }
    print.printToConsole('Event ' + eventCreated.id + ' created.');
  });
};

module.exports.updateEvent = function (connection) {
  var $streamId = $('#streamChoiceForEventManagement option:selected'),
    $content = $('#eventUpdateContent');

  if (parsing.isValidParams({
      method: 'update',
      type: 'events',
      vars: [
        connection,
        $streamId.val(),
        $content.val()
      ],
      messages : [
        'You must sign in first.',
        'You must chose stream.',
        'You must enter a content.'
      ]
    }) === false) { return; }
  var filter = new pryv.Filter({streams: [$streamId.val()], limit: 1});
  print.printToConsole('Updating event...');
  connection.events.get(filter, function (err, eventList) {
    if (err) { return print.printError(err); }
    if (eventList.length === 0) { return print.printToConsole('...there is no event.'); }
    eventList[0].content = $content.val();
    connection.events.update(eventList[0], function (err, eventUpdated) {
      if (err) { return print.printError(err); }
      print.printToConsole('Event ' + eventUpdated.id + ' updated.');
    });
  });
};

module.exports.getEvent = function (connection) {
  var $streamId = $('#streamChoiceForEventManagement option:selected'),
    count = Number($('#eventGetCount').val());

  if (parsing.isValidParams({
      method: 'get',
      type: 'events',
      vars: [
        connection,
        $streamId.val(),
        count
      ],
      messages : [
        'You must sign in first.',
        'You must chose stream.',
        'Enter a strictly positive value.'
      ]
    }) === false) { return; }
  var filter = new pryv.Filter({streams: [$streamId.val()], limit: count});
  if (count === 1) {
    print.printToConsole('Fetching ' + count + ' event...');
  } else {
    print.printToConsole('Fetching ' + count + ' events...');
  }
  connection.events.get(filter, function (err, eventList) {
    if (err) { return print.printError(err); }
    if (eventList.length === 0) { return print.printToConsole('...there is no event.'); }
    eventList.forEach(function (event, i) {
      if (i === eventList.length - 1) {
        display.displayEventData(event, 'end');
      } else {
        display.displayEventData(event);
      }
    });
  });
};

module.exports.deleteEvent = function(connection) {
  var $streamId = $('#streamChoiceForEventManagement option:selected'),
    count = Number($('#eventDeleteCount').val());

  if (parsing.isValidParams({
      method: 'delete',
      type: 'events',
      vars: [
        connection,
        $streamId.val(),
        count
      ],
      messages : [
        'You must sign in first.',
        'You must chose stream.',
        'Enter a strictly positive value.'
      ]
    }) === false) { return; }
  var filter = new pryv.Filter({streams: [$streamId.val()], limit: count});
  if (count === 1) {
    print.printToConsole('Deleting ' + count + ' event...');
  } else {
    print.printToConsole('Deleting ' + count + ' events...');
  }
  connection.events.get(filter, function (err, eventList) {
    if (err) { return print.printError(err); }
    if (eventList.length === 0) { return print.printToConsole('...there is no event.'); }
    eventList.forEach(function (event) {
      connection.events.delete(event, function (err, eventDeleted) {
        if (err) { return print.printError(err); }
        print.printToConsole('Event ' + eventDeleted.id + ' deleted.');
      });
    });
  });
};
