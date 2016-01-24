// app/models/user.js
// load the things we need
var mongoose = require('mongoose');


//four different types of mailboxes
// 1. messages from followers (essentially regular mail)
// 2. messages from purchases, allows us and the client to have a running history of what they have purchased
// 3. messages from music sold - ARTISTs & GROUP ONLY


//create mailbox schema
var mailSchema = mongoose.Schema({
    type: String,
    from: {
        user_id: String,
        firstName: String,
        lastName: String
    },
    subject: String,
    body: String,
    created_at: Date
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Mailbox', mailSchema);

