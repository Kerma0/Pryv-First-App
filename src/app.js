/**
 * Created by kermai_q on 6/23/16.
 */

var pryv = require('pryv');

var credentials = null;

var requestedPermissions = [{
    // Here we request full permissions on a custom stream;
    // in practice, scope and permission level will vary depending on your needs
    streamId: 'FirstApp',
    defaultName: 'First App',
    level: 'manage'
  }];

var connection;

var settings = {
    requestingAppId: 'first-app',
    requestedPermissions: requestedPermissions,
    spanButtonID: 'pryv-button',
    callbacks: {
        signedIn: function (conn, LangCode) {
            connection = conn;
            credentials = { username: connection.username, auth: connection.auth };
            console.log('Access granted:');
            console.log('- Username: ' + connection.username);
            console.log('- Token: ' + connection.auth);
            getLastEvents();
            createNoteEvent('toto');
          },
        refused: function (code) {
            console.log('Access refused: ' + code);
          },
        error: function (code, message) {
            console.log('Error :' + code + ' | ' + message);
          }
      }
    };

pryv.Auth.setup(settings);
console.log('toto');

function logToConsole(text) {
  console.log(text);
}

function createNoteEvent(text) {
    if (! connection) { return alert('Please sign in first.'); }
    logToConsole('Creating event...');
    var eventData = {
        streamId: 'FirstApp',
        type: 'note/txt',
        content: text
    };
    connection.events.create(eventData, function (err, event) {
        if (err) { return logToConsole('...error: ' + JSON.stringify(err)); }
        logToConsole('...event created: ' + event.id);
        getLastEvents();
    });
}

function getLastEvents() {
  var filter = new pryv.Filter({limit : 20});
  connection.events.get(filter, function (err, events) {
    // convert pryv.Event objects to plain data for display
    console.log(events.map(function (e) { return e.getData(); }));
  });
}