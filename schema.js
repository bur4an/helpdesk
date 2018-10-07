var mongoose = require('mongoose');

var Schema = {};
/*
Database and Models
*/
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    hash: String
});
Schema.User = mongoose.model('User', UserSchema);

module.exports = Schema;
