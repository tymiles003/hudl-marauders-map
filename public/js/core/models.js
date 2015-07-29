(function () {
var Device = function () {

  this.defineProperties({
    name: {type: 'string', required: true},
    udid: {type: 'string'},
    platform: {type: 'string'},
    osVersion: {type: 'string'},
    description: {type: 'string'},
    office: {type: 'string'},
    location: {type: 'object'},
    user: {type: 'object'},
    checkedOut: {type: 'boolean'},
    checkoutTime: {type: 'datetime'}
  });

  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
Device.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Device.someStaticMethod = function () {
  // Do some other stuff
};
Device.someStaticProperty = 'YYZ';
*/

Device = geddy.model.register('Device', Device);
}());

(function () {
var User = function () {

  this.defineProperties({
    email: {type: 'string', required: true},
    firstName: {type: 'string'},
    lastName: {type: 'string'}
  });

  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
User.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
User.someStaticMethod = function () {
  // Do some other stuff
};
User.someStaticProperty = 'YYZ';
*/

User = geddy.model.register('User', User);
}());