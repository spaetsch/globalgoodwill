var bcrypt      = require('bcrypt');
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var userSchema  = Schema({
  
});

// userSchema.methods.generatHash = function(password) {
//   returnn bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// }

// userSchema.methods.checkPassword = function(password){
//   return bcrypt.compareSync(password, this.password);
// }

module.exports  = mongoose.model('User', userSchema);