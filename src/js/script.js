/* global require */

var $ = require('jquery');

var login = require('./pryv/login'),
  manage = require('./utils/manage'),
  events = require('./pryv/methods/events'),
  streams = require('./pryv/methods/streams'),
  profile = require('./pryv/methods/profile'),
  accesses = require('./pryv/methods/accesses');

var connection = null;

$(document).ready(function() {
  var $createEvent = $('#eventCreateButton'),
    $updateEvent = $('#eventUpdateButton'),
    $getEvent = $('#eventGetButton'),
    $deleteEvent = $('#eventDeleteButton'),

    $createStream = $('#streamCreateButton'),
    $updateStream = $('#streamUpdateButton'),
    $getStream = $('#streamGetButton'),
    $deleteStream = $('#streamDeleteButton'),

    $createAccess = $('#accessCreateButton'),
    $updateAccess = $('#accessUpdateButton'),
    $getAccess = $('#accessGetButton'),
    $deleteAccess = $('#accessDeleteButton'),

    $getPublicProfile = $('#publicProfileGetButton'),
    $setPublicProfile = $('#publicProfileSetButton');

  tabManagement();
  manage.tabState('start');
  login.pryvLogin(function (auth) { connection = auth; });

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

  $createAccess.click(function () {
    accesses.createAccess(connection);
  });
  $updateAccess.click(function () {
    accesses.updateAccess(connection);
  });
  $getAccess.click(function () {
    accesses.getAccess(connection);
  });
  $deleteAccess.click(function () {
    accesses.deleteAccess(connection);
  });

  $getPublicProfile.click(function () {
    profile.getPublicProfile(connection);
  });
  $setPublicProfile.click(function () {
    profile.setPublicProfile(connection);
  });

});

function tabManagement() {
  var $hideOption = $('.hideIt'),
    $showOption = $('.showIt'),
    $eventsTitle = $('#eventsTitle'),
    $streamsTitle =  $('#streamsTitle'),
    $accessesTitle = $('#accessesTitle'),
    $profileTitle = $('#profileTitle');

  $hideOption.click(function () {
    manage.hideOption();
  });
  $showOption.click(function () {
    manage.hideOption();
  });
  $eventsTitle.click(function () {
    manage.tabState('events');
  });
  $streamsTitle.click(function () {
    manage.tabState('streams');
  });
  $accessesTitle.click(function () {
    manage.tabState('accesses');
  });
  $profileTitle.click(function () {
    manage.tabState('profile');
  });
}