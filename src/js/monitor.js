/* global require, module */

var binding = require('./binding.js'),
  utility = require('../util/utility.js'),
  Pryv = require('pryv');

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
        event.displayEventChange('loaded');
      });
    });

    monitor.addEventListener(Pryv.MESSAGES.MONITOR.ON_EVENT_CHANGE, function (changes) {
      [ 'created', 'modified', 'trashed' ].forEach(function (action) {
        changes[action].forEach(function (event) {
          event.displayEventChange(action);
        });
      });
    });

    monitor.addEventListener(Pryv.MESSAGES.MONITOR.ON_STRUCTURE_CHANGE, function (changes) {
      [ 'created', 'modified', 'trashed', 'deleted' ].forEach(function (action) {
        changes[action].forEach(function (stream) {
          stream.displayStreamChange(action, stream);
        });
      });
      utility.displayStreamTree(connection);
    });

    monitor.start(function (err) {
      if (err) { return binding.printError('Monitor error: ' + err); }
      binding.printToConsole('Monitor: started');
    });
  }
};