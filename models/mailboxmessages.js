var mongoose = require('mongoose');

var mailboxmessagesSchema = mongoose.Schema({
    title: String,
    date: Date,
    subject: String,
    body: String,
    sender_id: String,
    receiver_id: String
});

module.exports = mongoose.model(mailboxmessagesSchema, 'MailboxMessages');
