/* global require */

var $ = require('jquery');

var display = require('./utils/display'),
  streams = require('./pryv/streams'),
  events = require('./pryv/events'),
  login = require('./pryv/login');


var connection = null;

$(document).ready(function() {
  var $eventsTitle = $('#eventsTitle'),
    $streamsTitle =  $('#streamsTitle'),
    $hideOption = $('.hideDiv'),

    $createEvent = $('#eventCreateButton'),
    $updateEvent = $('#eventUpdateButton'),
    $getEvent = $('#eventGetButton'),
    $deleteEvent = $('#eventDeleteButton'),

    $createStream = $('#streamCreateButton'),
    $updateStream = $('#streamUpdateButton'),
    $getStream = $('#streamGetButton'),
    $deleteStream = $('#streamDeleteButton');

  $hideOption.click(function () {
    display.hideOption();
  });

  display.tabState('start');
  login.pryvLogin(function (auth) { connection = auth; });

  $eventsTitle.click(function () {
    display.tabState('events');
  });
  $streamsTitle.click(function () {
    display.tabState('streams');
  });

  $createEvent.click(function () {
    events.createEvent(connection);
  });
  $updateEvent.click(function () {
    events.updateEvent(connection);
  });
  $getEvent.click(function () {
    events.getEvent(connection);
  });
  $deleteEvent.click(function () {
    events.deleteEvent(connection);
  });

  $createStream.click(function () {
    streams.createStream(connection);
  });
  $updateStream.click(function () {
    streams.updateStream(connection);
  });
  $getStream.click(function () {
    streams.getStream(connection);
  });
  $deleteStream.click(function () {
    streams.deleteStream(connection);
  });

});