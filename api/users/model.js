'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


let userSchema = new Schema({
  name: 'String',
  userName: 'String',
  type: 'String',
  password: 'String',
  email: 'String'

});

userSchema.methods.comparePassword = function(password, hash){
  return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('users', userSchema);