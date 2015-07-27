var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var userSchema  = Schema({
  name: String,
  passwordHash: String
});

module.exports  = mongoose.model('User', userSchema);