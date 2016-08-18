/* global require, module */

var binding = require('./binding.js'),
  Pryv = require('pryv');

function displayEventChange (action, event) {
  var message = '.  Event: ' + action.toUpperCase() + '\t' +
    event.id + '\t' + event.streamId + '\t' + event.type + '\t' +
    event.content.substring(0, 30);
  if (event.trashed) {
    message += ' (trashed)';
  }
  binding.printToMonitor(message);
}
function displayStreamChange (action, stream) {
  var message = '. Stream: ' + action.toUpperCase() + '\t' + stream.id + '\t' +
    stream.name + '\t' + stream.parentId;
  if (stream.trashed) { message += ' (trashed)'; }
  binding.printToMonitor(message);
}

module.exports = {
  setupMonitor: function (connection) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    var filter = new Pryv.Filter({limit: 5}),
      monitor = connection.monitor(filter);
    
    monitor.ensureFullCache = false;
    monitor.initWithPrefetch = 0;

    monitor.addEventListener(Pryv.MESSAGES.MONITOR.ON_LOAD, function (events) {
      binding.printToConsole('Monitor: events loaded');
      events.forEach(function (event) {
        displayEventChange('loaded', event);
      });
    });

    monitor.addEventListener(Pryv.MESSAGES.MONITOR.ON_EVENT_CHANGE, function (changes) {
      [ 'created', 'modified', 'trashed' ].forEach(function (action) {
        changes[action].forEach(function (event) {
          displayEventChange(action, event);
        });
      });
    });

    monitor.addEventListener(Pryv.MESSAGES.MONITOR.ON_STRUCTURE_CHANGE, function (changes) {
      [ 'created', 'modified', 'trashed', 'deleted' ].forEach(function (action) {
        changes[action].forEach(function (event) {
          displayStreamChange(action, event);
        });
      });
      connection.streams.get(null, function(err, streams) {
        if (err) {
          binding.area.streams.value = 'Something went wrong while loading Streams.';
          return console.error(err);
        }
        binding.area.streams.value = JSON.stringify(
          connection.streams.getDisplayTree(streams), null, 2);
      });
    });

    monitor.start(function (err) {
      if (err) { return binding.printError('Monitor error: ' + err); }
      binding.printToConsole('Monitor: started');
    });
  }
};