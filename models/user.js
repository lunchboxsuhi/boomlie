// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    accountType: String,
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    create_at: Date,
    updated_at: Date,
    description: String,
    genre: String,
    followers: String,
    following: String,
    mailbox: [{
        social_id: String,
        purchase_id: String,
        sale_id: String
    }],
    profilePic: String,
    DOB: Date,
    location: {
        country: String,
        city: String
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);