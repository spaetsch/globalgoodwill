var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt');
var eat         = require('eat');
var Schema      = mongoose.Schema;

//Temperary need to set as env variable.
var SALT_WORK_FACTOR = 8;

var userSchema  = Schema({
  organization_name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  zip: String,
  country: String,
  role: { type: String, required: true },
  logo_url: String,
  basic: {
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true }
  },
});

userSchema.methods.generateHash   = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
};

userSchema.methods.checkPassword  = function(password) {
  return bcrypt.compareSync(password, this.basic.password_hash);
};

userSchema.methods.generateToken  = function(secret, callback) {
  eat.encode({id: this._id}, secret, callback);
};

module.exports  = mongoose.model('User', userSchema);
