/* global module, require */

var $ = require('jquery');

var print = require('../../utils/print'),
  parsing = require('../../utils/parsing');

module.exports.getPublicProfile = function (connection) {
  var $name = $('#publicProfileGetName');

  if (parsing.isValidParams({
      method: 'get',
      type: 'public-profile',
      vars: [
        connection
      ],
      messages : [
        'You must sign in first.'
      ]
    }) === false) { return; }
  print.printToConsole('Fetching public profiles...');
  connection.profile.getPublic($name.val() ? $name.val() : null, function(err, res) {
    if (err) { return print.printError(err); }
    if (!res) {
      print.printToConsole('...this profile doesn\'t exists.');
    } else if (Object.keys(res).length === 0) {
      print.printToConsole('...there is no profile.');
    } else if (res instanceof Object) {
      print.printToConsole(JSON.stringify(res, null, '  '));
    } else {
      print.printToConsole('Profile ' + $name.val() + ' has value: ' + res + '.');
    }
  });
};

module.exports.setPublicProfile = function (connection) {
  var $value = $('#publicProfileSetValue'),
    $key = $('#publicProfileSetKey');

  if (parsing.isValidParams({
      method: 'set',
      type: 'public-profile',
      vars: [
        connection,
        $key.val()
      ],
      messages : [
        'You must sign in first.',
        'You must enter a key.'
      ]
    }) === false) { return; }
  var data = {};
  data[$key.val()] = $value.val() ? $value.val() : null;
  if($value.val()) { print.printToConsole('Setting public profile...'); }
  else { print.printToConsole('Deleting public profile...'); }
  connection.profile.setPublic(data, function(err, res) {
    if (err) { return print.printError(err); }
    console.log('res', res);
    if (res.profile[$key.val()]) {
      print.printToConsole('Profile ' + $key.val() + ' created/updated.');
    } else {
      print.printToConsole('Profile ' + $key.val() + ' deleted.');
    }
  });
};