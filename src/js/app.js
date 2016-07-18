/* global require */

var binding = require('./binding.js'),
  monitor = require('./methods/monitor.js'),
  update = require('./methods/update.js'),
  create = require('./methods/create.js'),
  display = require('./methods/display.js'),
  del = require('./methods/delete.js'),
  config = require('../util/config.json'),
  Pryv = require('pryv');

var connection,
  eventText = [null, null],
  eventCount = [0, 0],
  settings = {
    requestingAppId: 'example-app',
    requestedPermissions: [{
      streamId: 'ExampleApp',
      defaultName: 'Example App',
      level: 'manage'
    }],
    returnURL: false,
    spanButtonID: 'pryv-button',
    callbacks: {
      initialization: function () {
        binding.printToConsole('Authentication initialized...', false);
      },
      needSignin: function(popupUrl, pollUrl, pollRateMs) {
        binding.printToConsole('Please sign-in:\n' +
          '{\n' + '  Url: ' + popupUrl + '\n' +
          '  Poll: ' + pollUrl + '\n' +
          '  PollRateMs: ' + pollRateMs + '\n}\n', false);
      },
      signedIn: function (authData) {
        connection = new Pryv.Connection(authData);
        binding.printToConsole('Access granted:\n' +
          '{\n' + '  Username: ' + authData.username + '\n' +
          '  Token: ' + authData.auth + '\n}\n', false);
        binding.area.accessInfo.value = binding.area.streams.value = 'Loading...';
        connection.accessInfo(function (err, info) {
          if (err) { return binding.printError('Error while loading Access Info', false); }
          binding.area.accessInfo.value = JSON.stringify(info, null, 2);
        });
        connection.streams.get(null, function(err, streams) {
          if (err) { return binding.printError('Error while loading Streams', false); }
          binding.area.streams.value = JSON.stringify(
            connection.streams.getDisplayTree(streams), null, 2);
        });
        monitor.setupMonitor(connection);
      },
      refused: function (code) {
        binding.printToConsole('Access refused: ' + code, false);
      },
      error: function (code, message) {
        binding.printToConsole('Error [' + code + ']: ' + message, false);
      }
    }
  };

Pryv.Auth.config.registerURL = {
  host: 'reg.' + config.pryvdomain,
  ssl: 'true'
};
Pryv.Auth.setup(settings);
userInput();
clickFunctions();

function userInput () {
  binding.eventContent.create.onchange = function () {
    eventText[0] = binding.eventContent.create.value;
  };
  binding.eventContent.update.onchange = function () {
    eventText[1] = binding.eventContent.update.value;
  };
  binding.eventCount.display.onchange = function () {
    eventCount[0] = binding.eventCount.display.value;
  };
  binding.eventCount.delete.onchange = function () {
    eventCount[1] = binding.eventCount.delete.value;
  };
}

function clickFunctions () {
  binding.button.create.onclick = function () {
    create.createNoteEvent(connection, eventText[0]);
  };
  binding.button.updateLast.onclick = function () {
    update.updateLastEvent(connection, eventText[1]);
  };
  binding.button.display.onclick = function () {
    display.displayNLastEvents(connection, eventCount[0]);
  };
  binding.button.delete.onclick = function () {
    del.deleteNLastEvent(connection, eventCount[1]);
  };
}
