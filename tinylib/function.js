/* global module, require */

var Pryv = require('pryv');

module.exports = {
  getNEvent: function (connection, n, callback) {
    var filter = new Pryv.Filter({limit: n});
    connection.events.get(filter, function (err, eventsData) {
      callback(err, eventsData);
    });
  },
  createEvent: function (connection, event, callback) {
    connection.events.create(event, function (err) {
      callback(err);
    });
  },
  updateEvent: function (connection, event, callback) {
    connection.events.update(event, function (err) {
      callback(err);
    });
  },
  deleteEvent: function (connection, event, callback) {
    connection.events.delete(event, function (err) {
      callback(err);
    });
  }
};
