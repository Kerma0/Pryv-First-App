/* global module */

module.exports = {
  button: {
    create: document.getElementById('create-button'),
    update: document.getElementById('update-button'),
    updateLast: document.getElementById('update-last-button'),
    display: document.getElementById('display-button'),
    delete: document.getElementById('delete-button')
  },
  eventContent: {
    create: document.getElementById('create-content'),
    update: document.getElementById('update-content')
  },
  eventCount: {
    display: document.getElementById('display-cnt'),
    delete: document.getElementById('delete-cnt')
  },
  eventId: {
    update: document.getElementById('update-id'),
    delete: document.getElementById('delete-id')
  },
  area: {
    console: document.getElementById('console'),
    accessInfo: document.getElementById('access-info'),
    streams: document.getElementById('streams')
  },
  printToConsole: function (message)
  {
    module.exports.area.console.value += message + '\n';
    module.exports.area.console.scrollTop = module.exports.area.console.scrollHeight;
  }
};