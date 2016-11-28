/* global module, require */

var $ = require('jquery'),
  pryv = require('pryv');

var display = require('../utils/display');

module.exports.createEvent = function (connection) {
  var $streamId = $('#streamChoiceForEventManagement option:selected'),
    $type = $('#eventCreateType'),
    $content = $('#eventCreateContent');

  if (!connection) {
    return display.printWarning('event', 'create', 'You must sign in first.');
  }
  if (!$streamId.val()) {
    return display.printWarning('event', 'create', 'You must chose stream.');
  }
  if (!$content.val()) {
    return display.printWarning('event', 'create', 'You must enter a content.');
  }
  if (!$type.val()) {
    return display.printWarning('event', 'create', 'You must enter a type.');
  }


  var eventData = {
    streamId: $streamId.val(),
    type: $type.val(),
    content: $content.val()
  };

  display.printToConsole('Creating event...');
  connection.events.create(eventData, function (err, eventCreated) {
    if (err) { return display.printError(err); }
    display.printToConsole('Event ' + eventCreated.id + ' created.');
  });
};

module.exports.updateEvent = function (connection) {
  var $streamId = $('#streamChoiceForEventManagement option:selected'),
    $content = $('#eventUpdateContent');

  if (!connection) {
    return display.printWarning('event', 'update', 'You must sign in first.');
  }
  if (!$streamId.val()) {
    return display.printWarning('event', 'update', 'You must chose stream.');
  }
  if (!$content.val()) {
    return display.printWarning('event', 'update', 'You must enter a content.');
  }

  var filter = new pryv.Filter({streams: [$streamId.val()], limit: 1});

  display.printToConsole('Updating event...');
  connection.events.get(filter, function (err, eventList) {
    if (err) { return display.printError(err); }
    if (eventList.length === 0) {
      return display.printWarning('event', 'update', 'There is no event.');
    }

    eventList[0].content = $content.val();
    connection.events.update(eventList[0], function (err, eventUpdated) {
      if (err) { return display.printError(err); }
      display.printToConsole('Event ' + eventUpdated.id + ' updated.');
    });
  });
};

module.exports.getEvent = function (connection) {
  var $streamId = $('#streamChoiceForEventManagement option:selected'),
    count = Number($('#eventGetCount').val());

  if (!connection) {
    return display.printWarning('event', 'get', 'You must sign in first.');
  }
  if (!$streamId.val()) {
    return display.printWarning('event', 'get', 'You must chose a stream.');
  }
  if (Number.isInteger(count) === false || count <= 0) {
    return display.printWarning('event', 'get', 'Enter a strictly positive value.');
  }

  var filter = new pryv.Filter({streams: [$streamId.val()], limit: count});

  if (count === 1) {
    display.printToConsole('Displaying ' + count + ' event...');
  } else {
    display.printToConsole('Displaying ' + count + ' events...');
  }
  connection.events.get(filter, function (err, eventList) {
    if (err) { return display.printError(err); }
    if (eventList.length === 0) { display.printToConsole('...there is no event.'); }

    eventList.forEach(function (event, i) {
      display.printToConsole('Event ' + (i + 1) + ':');
      display.displayEventData(event);
    });
  });
};

module.exports.deleteEvent = function(connection) {
  var $streamId = $('#streamChoiceForEventManagement option:selected'),
    count = Number($('#eventDeleteCount').val());

  if (!connection) {
    return display.printWarning('event', 'delete', 'You must sign in first.');
  }
  if (!$streamId.val()) {
    return display.printWarning('event', 'delete', 'You must chose a stream.');
  }
  if (Number.isInteger(count) === false || count <= 0) {
    return display.printWarning('event', 'delete', 'Enter a strictly positive value.');
  }

  var filter = new pryv.Filter({streams: [$streamId.val()], limit: count});

  if (count === 1) {
    display.printToConsole('Deleting ' + count + ' event...');
  } else {
    display.printToConsole('Deleting ' + count + ' events...');
  }
  connection.events.get(filter, function (err, eventList) {
    if (err) { return display.printError(err); }
    if (eventList.length === 0) { display.printToConsole('...there is no event.'); }

    eventList.forEach(function (event) {
      connection.events.delete(event, function (err, eventDeleted) {
        if (err) { return display.printError(err); }
        display.printToConsole('Event ' + eventDeleted.id + ' deleted.');
      });
    });
  });
};
