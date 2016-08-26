/* global module, require */

var binding = require('../js/binding.js');

module.exports = {
  displayAccessInfo: function (connection) {
    connection.accessInfo(function (err, info) {
      if (err) {
        binding.area.accessInfo.value = 'Something went wrong while loading Access Info.';
        return console.error(err);
      }
      binding.area.accessInfo.value = JSON.stringify(info, null, 2);
    });
  },
  displayStreamTree: function (connection) {
    connection.streams.get(null, function(err, streams) {
      if (err) {
        binding.area.streams.value = 'Something went wrong while loading Streams.';
        return console.error(err);
      }
      binding.area.streams.value = JSON.stringify(
        connection.streams.getDisplayTree(streams), null, 2);
    });
  }
};
