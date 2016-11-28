/* global module, require */

var $ = require('jquery');

var display = require('../utils/display');

module.exports.showStreamTree = function (connection) {
  var $console = $('#streamTree');
  var $streamChoiceForEvents = $('#streamChoiceForEventManagement');
  var $streamChoiceForStreamUpdate = $('#streamChoiceForStreamUpdate');

  $console.val('Loading...');
  connection.streams.get(null, function(err, streams) {
    if (err) {
      $console.val('Something went wrong while loading stream tree.');
      return display.printError(err);
    }
    var streamList = connection.streams.getDisplayTree(streams);

    $streamChoiceForEvents.empty();
    $streamChoiceForStreamUpdate.empty();
    streamList.forEach(function (stream) {
      $streamChoiceForEvents.append($('<option>', {
        value: stream.id,
        text : stream.name
      }));
      $streamChoiceForStreamUpdate.append($('<option>', {
        value: stream.id,
        text : stream.name
      }));
    });
    $console.val(JSON.stringify(streamList, null, 2));
  });
};

module.exports.showAccessInfo = function (connection) {
  var $console = $('#accessInfo');

  $console.val('Loading...');
  connection.accessInfo(function (err, info) {
    if (err) {
      $console.val('Something went wrong while loading access info.');
      return display.printError(err);
    }
    $console.val(JSON.stringify(info, null, 2), $console);
  });
};