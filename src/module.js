/**
 * Created by kerma on 28/06/16.
 */

var util = require('util');
var pryv = require('pryv');

module.exports = {
  connection: null,
  eventText: [null, null],
  eventCount: [0, 0],
  createButton: document.getElementById('create-event'),
  updateButton: document.getElementById('update-event'),
  displayButton: document.getElementById('display-events'),
  deleteButton: document.getElementById('delete-events'),
  eventContent: [
    document.getElementById('event-content'),
    document.getElementById('update-content')
  ],
  countEvents: [
    document.getElementById('cnt-events-display'),
    document.getElementById('cnt-events-delete')
  ],
  consoleArea: document.getElementById('console'),
  accessInfoArea: document.getElementById('access-info'),
  streamsArea: document.getElementById('streams'),
  settings: {
    requestingAppId: 'first-app',
    requestedPermissions: [{
      streamId: 'FirstApp',
      defaultName: 'First App',
      level: 'manage'
    }],
    returnURL: false,
    spanButtonID: 'pryv-button',
    callbacks: {
      initialization: function () {
        module.exports.printToConsole('Authentication initialized.\n');
      },
      needSignin: function(popupUrl, pollUrl, pollRateMs) {
        module.exports.printToConsole('Please sign-in:\n' +
          '    PopUpUrl: ' + popupUrl + '\n' +
          '    PollUrl: ' + pollUrl + '\n' +
          '    PollRateMs: ' + pollRateMs);
      },
      signedIn: function (authData) {
        module.exports.connection = new pryv.Connection(authData);
        module.exports.printToConsole('Access granted:\n' +
          '    Username: ' + authData.username + '\n' +
          '    Token: ' + authData.auth);
        module.exports.accessInfoArea.value = module.exports.streamsArea.value = 'Loading...';
        module.exports.connection.accessInfo(function (err, info) {
          if (err) { return module.exports.printError('Error while loading Access Info'); }
          module.exports.accessInfoArea.value = JSON.stringify(info, null, 2);
        });
        module.exports.connection.streams.get(null, function(err, streams) {
          if (err) { return module.exports.printError('Error while loading Streams'); }
          module.exports.streamsArea.value = JSON.stringify(
            module.exports.connection.streams.getDisplayTree(streams),
            null,
            2
          );
        });
      },
      refused: function (code) {
        module.exports.printToConsole('Access refused: ' + code);
      },
      error: function (code, message) {
        module.exports.printToConsole('Error: ' + code + ' : ' + message);
      }
    }
  },
  pryvAuth: function () {
    pryv.Auth.config.registerURL = { host: 'reg.pryv.me', 'ssl': true };
    pryv.Auth.setup(module.exports.settings);
  },
  updateNoteEvent: function(text) {
    if (module.exports.connection === null) {
      return module.exports.printError('You must sign in first');
    }
    module.exports.printToConsole('Updating event...');
    var filter = new pryv.Filter({limit: 1});
    module.exports.connection.events.get(filter, function (err, event) {
      if (err) { return console.error('Error: ' + JSON.stringify(err)); }
      if (event.length === 0) {
        module.exports.printToConsole('There is no events to update, create at least one event');
      }
      module.exports.connection.events._updateWithIdAndData(
        event[0].id,
        {content: text},
        function (err, event) {
        if (err) { return console.error('Error: ' + JSON.stringify(err)); }
        module.exports.printToConsole('Event updated: ' + event.id);
      });
    });
  },
  deleteEvent: function (id) {
    if (module.exports.connection === null) {
      return module.exports.printError('You must sign in first');
    }
    module.exports.connection.events.trashWithId(id, function (err) {
      if (err) { module.exports.printError('Error: ' + JSON.stringify(err)); }
      module.exports.printToConsole('Event ' + id + ' deleted.');
    });
  },
  deleteNLastEvent: function(n) {
    n = Number(n);
    if (module.exports.connection === null) {
      return module.exports.printError('You must sign in first');
    }
    if (Number.isInteger(n) === false || n <= 0 || n > 20) {
      return module.exports.printError('Please enter a numeric value and respect 0 < n <= 20');
    }
    else if (n === 1) { module.exports.printToConsole('Deleting ' + n + ' event...'); }
    else { module.exports.printToConsole('Deleting ' + n + ' events...'); }
    var filter = new pryv.Filter({limit: n});
    module.exports.connection.events.get(filter, function (err, event) {
      if (err) { return console.error('Error: ' + JSON.stringify(err)); }
      if (event.length === 0) {
        module.exports.printToConsole('There is no more events to delete.');
      }
      else { for (var i = 0; i < event.length; i++) { module.exports.deleteEvent(event[i].id); }
      }
    });
  }, 
  displayNLastEvents: function (n) {
    n = Number(n);
    if (module.exports.connection === null) {
      return module.exports.printError('You must sign in first');
    }
    if (Number.isInteger(n) === false || n <= 0 || n > 20) {
      return module.exports.printError('Please enter a numeric value and respect 0 < n <= 20');
    }
    else if (n === 1) { module.exports.printToConsole('Displaying ' + n + ' event...'); }
    else { module.exports.printToConsole('Displaying ' + n + ' events...'); }
    var filter = new pryv.Filter({limit: n});
    module.exports.connection.events.get(filter, function (err, events) {
      if (err) { return module.exports.printError('Error: ' + JSON.stringify(err)); }
      if (events.length === 0) {
        module.exports.printToConsole('There is no more event to display.');
      }
      else {
        var eventsArray = events.map(function (e) { return util.inspect(e.getData()); });
        for (var i = 0; i < eventsArray.length; i++) {
          module.exports.printToConsole('Event ' + i + ':\n' + eventsArray[i]);
        }
      }
    });
  },
  createNoteEvent: function (text) {
    if (module.exports.connection === null) {
      return module.exports.printError('You must sign in first');
    }
    module.exports.printToConsole('Creating event...');
    var eventData = {
      streamId: 'FirstApp',
      type: 'note/txt',
      content: text
    };
    module.exports.connection.events.create(eventData, function (err, event) {
      if (err) { return module.exports.printError('Error: ' + JSON.stringify(err)); }
      module.exports.printToConsole('Event created: ' + event.id);
    });
  },
  userInput: function () {
    module.exports.eventContent[0].onkeyup = function () {
      module.exports.eventText[0] = module.exports.eventContent[0].value;
    };
    module.exports.eventContent[1].onkeyup = function () {
      module.exports.eventText[1] = module.exports.eventContent[1].value;
    };
    module.exports.countEvents[0].onkeyup = function () {
      module.exports.eventCount[0] = module.exports.countEvents[0].value;
    };
    module.exports.countEvents[1].onkeyup = function () {
      module.exports.eventCount[1] = module.exports.countEvents[1].value;
    };
  },
  clickFunctions: function () {
    module.exports.createButton.onclick = function () {
      module.exports.createNoteEvent(module.exports.eventText[0]);
    };
    module.exports.updateButton.onclick = function () {
      module.exports.updateNoteEvent(module.exports.eventText[1]);
    };
    module.exports.displayButton.onclick = function () {
      module.exports.displayNLastEvents(module.exports.eventCount[0]);
    };
    module.exports.deleteButton.onclick = function () {
      module.exports.deleteNLastEvent(module.exports.eventCount[1]);
    };
  },
  printToConsole: function (message) {
    module.exports.consoleArea.value += message + '\n';
    module.exports.consoleArea.scrollTop = module.exports.consoleArea.scrollHeight;
  },
  printError: function (errMessage) {
    module.exports.printToConsole('Error: ' + errMessage + '.');
    return console.error('Error: ' + errMessage + '.');
  }
};