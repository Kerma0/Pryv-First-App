/* global require, module */

var binding = require('../binding.js'),
  Pryv = require('pryv');

function displayEventChange (action, event) {
  var message = '. ' + action.toUpperCase() + '\t' +
    event.id + '\t' + event.time + '\t' + event.type + '\t' +
    event.content.substring(0, 30);
  if (event.trashed) {
    message += ' (trashed)';
  }
  binding.printToConsole(message);
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

    monitor.start(function (err) {
      if (err) { return binding.printError('Monitor error: ' + err); }
      binding.printToConsole('Monitor started');
    });
  }
};