/* global module, require */

var Pryv = require('pryv');

module.exports = {
  events: {
    get: function (connection, n, streamId, callback) {
      var filter = new Pryv.Filter({
        streams: [ streamId ],
        limit: n
      });
      connection.events.get(filter, function (err, eventList) {
        callback(err, eventList);
      });
    },
    create: function (connection, event, callback) {
      connection.events.create(event, function (err, eventCreated) {
        callback(err, eventCreated);
      });
    },
    update: function (connection, event, callback) {
      connection.events.update(event, function (err, eventUpdated) {
        callback(err, eventUpdated);
      });
    },
    delete: function (connection, event, callback) {
      connection.events.delete(event, function (err, eventDeleted) {
        callback(err, eventDeleted);
      });
    }
  },
  streams: {
    get: function (connection, option, callback) {
      connection.streams.get(option, function (err, streamList) {
        callback(err, streamList);
      });
    },
    create: function (connection, stream, callback) {
      connection.streams.create(stream, function (err, streamCreated) {
        callback(err, streamCreated);
      });
    },
    update: function (connection, stream, callback) {
      connection.streams.update(stream, function (err, streamUpdated) {
        callback(err, streamUpdated);
      });
    },
    delete: function (connection, stream, mergeEventsWithParent, callback) {
      connection.streams.delete(stream, function (err, streamDeleted) {
        callback(err, streamDeleted);
      }, mergeEventsWithParent);
    }
  }
};
