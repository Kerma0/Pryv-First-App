/* global module, require */

var $ = require('jquery');

var display = require('../utils/display');


module.exports.showStreamTree = function (connection) {
  var $console = $('#streamTree'),
    streamList = [];

  updateStreamList(null);
  $console.val('Loading...');
  connection.streams.walkTree(null, function (stream) {
    if (!stream.parentId) { streamList.push(stream); }
  }, function (err) {
    if (err) {
      $console.val('Something went wrong while loading stream tree.');
      return display.printError(err);
    }
    updateStreamList(streamList);
    $console.val(JSON.stringify(connection.streams.getDisplayTree(streamList), null, '  '));
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
    $console.val(JSON.stringify(info, null, '  '), $console);
  });
};

function updateStreamList(streamList) {
  var $streamChoiceForStreamUpdate = $('#streamChoiceForStreamUpdate'),
    $streamChoiceForEvents = $('#streamChoiceForEventManagement');

  if (!streamList) {
    $streamChoiceForEvents.empty();
    $streamChoiceForStreamUpdate.empty();
  } else {
    streamList.forEach(function (stream) {
      var options = organizeStreamList([], '', stream, streamList);
      options.forEach(function (option) {
        $streamChoiceForEvents.append($('<option>', option));
        $streamChoiceForStreamUpdate.append($('<option>', option));
      });
    });
  }
}

function organizeStreamList(options, str, stream, streamList) {
  options.push({
    value: stream.id,
    text: str ? str + '> ' + stream.name : stream.name
  });
  stream.children.forEach(function (child) {
    organizeStreamList(options, str + '-', child, streamList);
  });
  return options;
}