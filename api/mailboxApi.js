var express = require('express');
var mailbox = require('./../models/mailbox.js');

module.exports = function() {

    var router = express.Router();

    //POST: create ? creating a mailbox? nooo we create messages associated with mailboxes

    // update an e-mail wtf? perhaps have a draft section ?

    //GET: all email for this user
    router.get('/mailbox/:id', function(req, res) {
        mailbox.findOne({_id: req.param}, function(err, mail) {
            if (err) throw err;

            res.json(mail);
        })
    });


    return router;
};
