// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

//create mailbox schema
var mailSchema = mongoose.Schema({
    type: String,
    from: {
        _id: String,
        firstName: String,
        lastName: String
    },
    message: String,
    created_at: Date
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Mailbox', mailSchema);

