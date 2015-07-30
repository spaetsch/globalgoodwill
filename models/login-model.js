var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt');
var eat         = require('eat');
var Schema      = mongoose.Schema;

//Temperary need to set as env variable.
var SALT_WORK_FACTOR = 8;

var loginSchema  = Schema({
  basic: {
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true }
  }
});

loginSchema.methods.generateHash   = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
};

loginSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

loginSchema.methods.generateToken  = function(secret, callback) {
  eat.encode({id: this._id}, secret, callback);
};

module.exports  = mongoose.model('login', userSchema);
