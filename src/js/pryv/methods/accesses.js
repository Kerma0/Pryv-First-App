/* global module, require */

var $ = require('jquery');

var print = require('../../utils/print'),
  display = require('../../utils/display'),
  parsing = require('../../utils/parsing');

module.exports.createAccess = function (connection) {
  var $level = $('#accessCreateLevel'),
    $streamId = $('#accessCreateId'),
    $name = $('#accessCreateName');

  if (parsing.isValidParams({
      method: 'create',
      type: 'accesses',
      vars: [
        connection,
        $name.val(),
        $streamId.val(),
        $level.val()
      ],
      messages : [
        'You must sign in first.',
        'You must enter a name.',
        'You must enter a streamId (or \'*\' for all streams).',
        'You must enter a level (manage, read or contribute).'
      ]
    }) === false) { return; }
  var access = {
    name: $name.val(),
    permissions: [
      {
        streamId: $streamId.val(),
        level: $level.val()
      }
    ]
  };
  print.printToConsole('Creating access...');
  connection.accesses.create(access, function (err, accessCreated) {
    if (err) { return print.printError(err); }
    print.printToConsole('Access ' + accessCreated.id + ' created.');
  });
};

module.exports.updateAccess = function (connection) {
  var $name= $('#accessUpdateName');

  if (parsing.isValidParams({
      method: 'update',
      type: 'accesses',
      vars: [
        connection,
        $name.val()
      ],
      messages : [
        'You must sign in first.',
        'You must enter a name.'
      ]
    }) === false) { return; }
  print.printToConsole('Updating access...');
  connection.accesses.get(function (err, accessList) {
    if (err) { return print.printError(err); }
    if (accessList.length === 0) { return print.printToConsole('...there is no access.'); }
    var index = 0,
      time = 0;
    accessList.forEach(function (access, i) {
      if (access.modified > time) {
        time = access.modified;
        index = i;
      }
      if (i === accessList.length - 1) {
        accessList[index].name = $name.val();
        connection.accesses.update(accessList[index], function (err, accessUpdated) {
          if (err) { return print.printError(err); }
          print.printToConsole('Access ' + accessUpdated.id + ' updated.');
        });
      }
    });
  });
};

module.exports.getAccess = function (connection) {
  if (parsing.isValidParams({
      method: 'get',
      type: 'accesses',
      vars: [ connection ],
      messages: [ 'You must sign in first.' ]
    }) === false) { return; }
  print.printToConsole('Displaying access...');
  connection.accesses.get(function (err, accessList) {
    if (err) { return print.printError(err); }
    if (accessList.length === 0) { print.printToConsole('...there is no access.'); }
    accessList.forEach(function (event, i) {
      if (i === accessList.length - 1) {
        display.displayAccessData(event, 'end');
      } else {
        display.displayAccessData(event);
      }
    });
  });
};

module.exports.deleteAccess = function (connection) {
  var $id = $('#accessDeleteId');

  if (parsing.isValidParams({
      method: 'delete',
      type: 'accesses',
      vars: [
        connection,
        $id.val()
      ],
      messages: [
        'You must sign in first.',
        'You must enter an accessId.'
      ]
    }) === false) { return; }
  var access = { id: $id.val() };
  print.printToConsole('Deleting access...');
  connection.accesses.delete(access.id, function (err, accessDeleted) {
    if (err) { return print.printError(err); }
    print.printToConsole('Access ' + accessDeleted.accessDeletion.id + ' deleted.');
  });
};