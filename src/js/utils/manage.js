/* global module, require */

var $ = require('jquery');

module.exports.resetAll = function (callback) {
  var $streamChoiceForStreamUpdate = $('#streamChoiceForStreamUpdate'),
    $streamChoiceForEvents = $('#streamChoiceForEventManagement'),
    $accessInfo = $('#accessInfo'),
    $streamTree = $('#streamTree'),
    $console = $('#console'),
    $monitor = $('#monitor');

  $streamChoiceForStreamUpdate.empty();
  $streamChoiceForEvents.empty();
  $accessInfo.val('');
  $streamTree.val('');
  $console.text('');
  $monitor.text('');
  callback();
};

module.exports.hideOption = function () {
  var $accessInfoDiv = $('#accessInfoDiv'),
    $streamTreeDiv = $('#streamTreeDiv'),
    $hideState = $('#hideState');

  if ($accessInfoDiv.is(':visible') && $streamTreeDiv.is(':visible')) {
    $accessInfoDiv.hide();
    $streamTreeDiv.hide();
    $hideState.text('Show');
  } else {
    $accessInfoDiv.show();
    $streamTreeDiv.show();
    $hideState.text('Hide');
  }
};

module.exports.tabState = function (state) {
  var $eventsView = $('#eventsContainer'),
    $streamsView = $('#streamsContainer'),
    $accessesView = $('#accessesContainer'),
    $eventsTitle = $('#eventsTitle'),
    $streamsTitle =$('#streamsTitle'),
    $accessesTitle = $('#accessesTitle');

  switch(state) {
    case 'start':
      $eventsView.hide();
      $streamsView.hide();
      $accessesView.hide();
      tabShow($eventsView, $eventsTitle);
      break;
    case 'events':
      tabHide($accessesView, $accessesTitle);
      tabHide($streamsView, $streamsTitle);
      tabShow($eventsView, $eventsTitle);
      break;
    case 'streams':
      tabHide($accessesView, $accessesTitle);
      tabHide($eventsView, $eventsTitle);
      tabShow($streamsView, $streamsTitle);
      break;
    case 'accesses':
      tabHide($eventsView, $eventsTitle);
      tabHide($streamsView, $streamsTitle);
      tabShow($accessesView, $accessesTitle);
      break;
  }
};

module.exports.updateStreamList = function (streamList) {
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
};

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

function tabShow(tabView, tabTitle) {
  if (!tabView.is(':visible')) {
    tabTitle.removeClass('titleDiv').addClass('titleFocus');
    tabView.show();
  }
}

function tabHide(tabView, tabTitle) {
  if (tabView.is(':visible')) {
    tabTitle.removeClass('titleFocus').addClass('titleDiv');
    tabView.hide();
  }
}