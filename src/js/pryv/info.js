/* global module, require */

var $ = require('jquery');

var print = require('../utils/print'),
  manage = require('../utils/manage');

module.exports.showStreamTree = function (connection) {
  var $console = $('#streamTree'),
    streamList = [];

  $console.val('Loading...');
  manage.updateStreamList(null);
  setTimeout(function () {
    connection.streams.walkTree(null, function (stream) {
      if (!stream.parentId) { streamList.push(stream); }
    }, function (err) {
      if (err) {
        $console.val('Something went wrong while loading stream tree.');
        return print.printError(err);
      }
      manage.updateStreamList(streamList);
      $console.val(JSON.stringify(connection.streams.getDisplayTree(streamList), null, '  '));
    });
  }, 500);
};

module.exports.showAccessInfo = function (connection) {
  var $console = $('#accessInfo');

  $console.val('Loading...');
  connection.accessInfo(function (err, info) {
    if (err) {
      $console.val('Something went wrong while loading access info.');
      return print.printError(err);
    }
    $console.val(JSON.stringify(info, null, '  '), $console);
  });
};