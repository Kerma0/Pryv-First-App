/* global module */

module.exports = {
  button: {
    events: {
      create: document.getElementById('event-create-button'),
      update: document.getElementById('event-update-last-button'),
      display: document.getElementById('event-display-button'),
      delete: document.getElementById('event-delete-button')
    },
    streams: {
      create: document.getElementById('stream-create-button'),
      update: document.getElementById('stream-update-button'),
      display: document.getElementById('stream-display-button'),
      delete: document.getElementById('stream-delete-button')
    }
  },
  content: {
    events: {
      choice: document.getElementById('stream-chosen-id'),
      create: document.getElementById('event-create-content'),
      update: document.getElementById('event-update-content'),
      display: document.getElementById('event-display-count'),
      delete: document.getElementById('event-delete-count')
    },
    streams: {
      create: {
        name: document.getElementById('stream-create-name'),
        id: document.getElementById('stream-create-id'),
        parentId: document.getElementById('stream-create-parentId')
      },
      update: {
        name: document.getElementById('stream-update-name'),
        id: document.getElementById('stream-update-id'),
        parentId: document.getElementById('stream-update-parentId')
      },
      display: {
        active: document.getElementById('stream-display-active'),
        parentId: document.getElementById('stream-display-parentId')
      },
      delete: {
        merge: document.getElementById('stream-delete-merge'),
        id: document.getElementById('stream-delete-id')
      }
    }
  },
  area: {
    console: document.getElementById('console'),
    monitor: document.getElementById('monitor'),
    accessInfo: document.getElementById('access-info'),
    streams: document.getElementById('streams')
  },
  printToConsole: function (message)
  {
    module.exports.area.console.value += message + '\n';
    module.exports.area.console.scrollTop = module.exports.area.console.scrollHeight;
  },
  printToMonitor: function (message)
  {
    module.exports.area.monitor.value += message + '\n';
    module.exports.area.monitor.scrollTop = module.exports.area.monitor.scrollHeight;
  },
  printWarning: function (err) {
    module.exports.printToConsole('Warning: ' + err);
    throw err;
  },
  printError: function (err) {
    module.exports.printToConsole('Error: ' + JSON.stringify(err));
    return console.error('Error: ' + JSON.stringify(err));
  }
};