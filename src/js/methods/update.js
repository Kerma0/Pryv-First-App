/* global require, module */

var binding = require('../binding.js'),
  func = require('../function');

module.exports = {
  updateLastEvent: function (connection, text) {
    if (!connection) { binding.printWarning('Sign in first.'); }
    if (!text) { binding.printWarning('Enter a content.'); }
    func.getNEvent(connection, 1, function (err, event) {
      if (err) { return binding.printError(err); }
      if (event.length === 0) { binding.printWarning('There is no event.'); }
      event[0].content = text;
      func.updateEvent(connection, event[0], function (err) {
        if (err) { return binding.printError(err); }
      });
    });
  }
};