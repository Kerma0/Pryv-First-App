/* global require, module */

var Pryv = require('pryv'),
  config = require('../src/util/config.json');

module.exports = {
  connectionSettings: {
    username: 'test-example-app',
    auth: 'ciqjilwh20a5d91pn0v4pyvnn',
    domain: config.pryvdomain
  },
  cleanAllEvents: function (connection) {
    var isEmpty = 'run';
    var filter = new Pryv.Filter({limit: 1});
    while (isEmpty === 'run') {
      isEmpty = deleteEventForTest(connection, filter, isEmpty);
    }
  }
};
  
function deleteEventForTest(connection, filter, isEmpty) {
  connection.events.get(filter, function (err, event) {
    if (err) { return console.error('Error: ' + JSON.stringify(err)); }
    if (event.length === 0) { isEmpty = 'stop'; }
    else {
      connection.events.trashWithId(event.id, function (err, event) {
        if (err) { return console.error('Error: ' + err); }
        console.log('Event ' + event.id + ' deleted');
      });
      return isEmpty;
    }
  });
}