/* global require */

require('../util/format.js');

var binding = require('./binding.js'),
  monitor = require('./monitor.js'),
  utility = require('../util/utility.js'),
  config = require('../util/config.json'),
  Pryv = require('pryv'),
  methods = {
    events: {
      update: require('./methods/events/update.js'),
      create: require('./methods/events/create.js'),
      display: require('./methods/events/display.js'),
      delete: require('./methods/events/delete.js')
    },
    streams: {
      update: require('./methods/streams/update.js'),
      create: require('./methods/streams/create.js'),
      display: require('./methods/streams/display.js'),
      delete: require('./methods/streams/delete.js')
    }
  };

var connection,
  settings = {
    requestingAppId: 'example-app',
    requestedPermissions: [{
      streamId: '*',
      level: 'manage'
    }],
    returnURL: false,
    spanButtonID: 'pryv-button',
    callbacks: {
      initialization: function () {
        binding.printToConsole('-> Authentication initialized...');
      },
      needSignin: function(popupUrl, pollUrl, pollRateMs) {
        binding.printToConsole('...please sign-in...');
        if (!popupUrl || !pollUrl || !pollRateMs) {
          binding.printError('Something went wrong while trying to authenticate.' + '\n');
        }
      },
      signedIn: function (authData) {
        connection = new Pryv.Connection(authData);
        connection.fetchStructure(function (err) {
          if (err) { binding.printError(err); }
        });
        binding.printToConsole('...access granted for user ' + authData.username +
          ' with following token: ' + authData.auth + '.\n');
        binding.area.accessInfo.value = binding.area.streams.value = 'Loading...';

        utility.displayAccessInfo(connection);
        utility.displayStreamTree(connection);

        monitor.setupMonitor(connection);
      },
      refused: function (code) {
        binding.printToConsole('...access refused: ' + code + '\n');
      },
      error: function (code, message) {
        binding.printToConsole('...error [' + code + ']: ' + message + '\n');
      }
    }
  };

function userInputs () {
  binding.button.events.create.onclick = function () {
    methods.events.create.createEvent(
      connection,
      binding.content.events.create.value,
      binding.content.events.type.value,
      binding.content.events.choice.value
    );
  };
  binding.button.events.update.onclick = function () {
    methods.events.update.updateEvent(
      connection,
      binding.content.events.update.value,
      binding.content.events.choice.value
    );
  };
  binding.button.events.display.onclick = function () {
    methods.events.display.displayEvent(
      connection,
      binding.content.events.display.value,
      binding.content.events.choice.value
    );
  };
  binding.button.events.delete.onclick = function () {
    methods.events.delete.deleteEvent(
      connection,
      binding.content.events.delete.value,
      binding.content.events.choice.value
    );
  };

  binding.button.streams.create.onclick = function () {
    methods.streams.create.createStream(connection, binding.content.streams.create);
  };
  binding.button.streams.update.onclick = function () {
    methods.streams.update.updateStream(connection, binding.content.streams.update);
  };
  binding.button.streams.display.onclick = function () {
    methods.streams.display.displayStream(connection, binding.content.streams.display);
  };
  binding.button.streams.delete.onclick = function () {
    methods.streams.delete.deleteStream(connection, binding.content.streams.delete);
  };
}

Pryv.Auth.config.registerURL.host = 'reg.' + config.pryvdomain;
Pryv.Auth.setup(settings);
userInputs();
