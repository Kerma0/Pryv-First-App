/* global module, require */

var Pryv = require('pryv');

module.exports = {
  getNEvent: function (connection, n, callback) {
    var filter = new Pryv.Filter({limit: n}); /* Set the number of events to retrieve */
    connection.events.get(filter, function (err, events) {
      callback(err, events);
    });
  },
  createEvent: function (connection, text, callback) {
    var eventData = { /* This is the minimum required data to create an event */
      streamId: 'ExampleApp', /* Replace it with your own streamId */
      type: 'note/txt',  /* A list of all types is on pryv website in reference/event-types */
      content: text
    };
    connection.events.create(eventData, function (err, event) {
      callback(err, event.id);
    });
  },
  updateEvent: function (connection, id, text, callback) {
    connection.events._updateWithIdAndData(id, {content: text}, function (err, event) {
      callback(err, event.id);
    });
  },
  deleteEvent : function (connection, id, callback) {
    connection.events.trashWithId(id, function (err, event) {
      callback(err, event.id);
    });
  }
};