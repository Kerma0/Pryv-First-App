/* global module, require */

var $ = require('jquery');

module.exports.printToConsole = function (str, consoleId) {
  var $console = $('#console');

  if (consoleId) { $console = consoleId; }
  $console.append(str + '\n');
  if($console.length) {
    $console.scrollTop($console[0].scrollHeight - $console.height());
  }
};

module.exports.printError = function (err) {
  if (err.message) {
    module.exports.printToConsole(err.message);
  } else {
    module.exports.printToConsole('ERROR: An error occurred,' +
      ' open your browser console for details.');
  }
  console.log('ERROR:', err);
};

module.exports.printWarning = function (type, method, message) {
  module.exports.printToConsole('WARNING [' + type + '.' + method + ']: ' + message);
  throw message;
};

module.exports.displayEventChange = function (event, action) {
  var message = '.  Event: ' + action.toUpperCase() + '\t' +
    event.id + '\t' + event.streamId + '\t' + event.type + '\t' +
    event.content;

  if (event.trashed) { message += ' (trashed)'; }
  module.exports.printToConsole(message, $('#monitor'));
};

module.exports.displayStreamChange = function (stream, action) {
  var message = '. Stream: ' + action.toUpperCase() + '\t' + stream.id + '\t' +
    stream.name + '\t' + stream.parentId;
  if (stream.trashed) { message += ' (trashed)'; }
  module.exports.printToConsole(message, $('#monitor'));
};

module.exports.displayStreamData = function (stream) {
  var message = '\t{ name: ' + stream.name + '\n' + '\t  id: ' + stream.id + '\n' +
    '\t  trashed: ' + stream.trashed + '\n' +  '\t  parentId: ' + stream.parentId + '\n';
  if (stream.childrenIds) {
    if (stream.childrenIds.length === 0) {
      message += '\t  childrenIds: [] }';
    }
    else {
      stream.childrenIds.forEach(function (childrenId, i, array) {
        if (i === 0 && array.length === 1) {
          message += '\t  childrenIds: [ ' + childrenId + ' ] }';
        }
        else if (i === 0 && array.length > 1) {
          message += '  childrenIds: [ ' + childrenId + '\n';
        }
        else if (i === array.length - 1) {
          message += '\t    ' + childrenId + ' ] }';
        }
        else {
          message += '\t    ' + childrenId;
        }
      });
    }
    module.exports.printToConsole(message);
  }
};

module.exports.displayEventData = function (event) {
  var message = '\t{ streamId: ' + event.streamId + '\n' +
    '\t  type: ' + event.type + '\n' +
    '\t  content: ' + event.content + '\n' +
    '\t  trashed: ' + event.trashed + '\n' +
    '\t  tags: ' + event.tags + '\n' +
    '\t  time: ' + event.time + '\n' +
    '\t  id: ' + event.id  + ' }';

  module.exports.printToConsole(message);
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
    $eventsTitle = $('#eventsTitle'),
    $streamsTitle =$('#streamsTitle');

  switch(state) {
    case 'start':
      $eventsView.hide();
      $streamsView.hide();
      tabSwitch($eventsView, $eventsTitle);
      break;
    case 'events':
      tabHide($streamsView, $streamsTitle);
      tabSwitch($eventsView, $eventsTitle);
      break;
    case 'streams':
      tabHide($eventsView, $eventsTitle);
      tabSwitch($streamsView, $streamsTitle);
      break;
  }
};

function tabSwitch(tabView, tabTitle) {
  if (tabView.is(':visible')) {
    tabTitle.removeClass('titleFocus').addClass('titleDiv');
    tabView.hide();
  } else {
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