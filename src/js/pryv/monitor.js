/* global module, require */

var pryv = require('pryv');

var info = require('./info'),
  print = require('../utils/print'),
  display = require('../utils/display');

module.exports.setupMonitor = function (connection) {
  var filter = new pryv.Filter({limit: 5}),
    monitor = connection.monitor(filter);

  monitor.ensureFullCache = false;
  monitor.initWithPrefetch = 0;

  monitor.addEventListener(pryv.MESSAGES.MONITOR.ON_LOAD, function (events) {
    print.printToConsole('Monitor: events loaded');
    events.forEach(function (event) {
      display.displayEventChange(event, 'loaded');
    });
  });

  monitor.addEventListener(pryv.MESSAGES.MONITOR.ON_EVENT_CHANGE, function (changes) {
    [ 'created', 'modified', 'trashed' ].forEach(function (action) {
      changes[action].forEach(function (event) {
        display.displayEventChange(event, action);
      });
    });
  });

  monitor.addEventListener(pryv.MESSAGES.MONITOR.ON_STRUCTURE_CHANGE, function (changes) {
    [ 'created', 'modified', 'trashed', 'deleted' ].forEach(function (action) {
      changes[action].forEach(function (stream) {
        display.displayStreamChange(stream, action);
      });
    });
    info.showStreamTree(connection);
  });

  monitor.start(function (err) {
    if (err) { return print.printError('Monitor error:', err); }
    print.printToConsole('Monitor: started');
  });
};
