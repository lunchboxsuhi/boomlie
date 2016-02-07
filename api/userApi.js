var express = require('express');
var User = require('./../models/user');

module.exports = function(mongoose) {

    var router = express.Router();

    router.get('/test', function(req, res) {
        res.json({success: true });
    });

    //POST: Create
    router.post('/user', function(req, res) {
        var newUser = new User(req.body);

        if (newUser != null) {
            newUser.save(function(err) {
                if (err) throw err;

                console.log('new user created');
            });
        }
    });

    //PUT: Update
    router.put('/user/:id', function(req, res) {

        var userId = mongoose.ObjectId(req.param);

        if (userId != null) {
            User.findOne({_id: userId}, function(err, user) {
                var updateUser = new User(req.body);

                updateUser.save(function(err) {
                    if (err) throw err;
                    console.log('user updated');
                })
            });
        }
    });

    //GET: All Users [this will be our search functionality not that we need this as of yet
    router.get('/user', function(req, res) {
        User.find({}, function(err, users) {
            if (err) throw err;

            res.json(users);
        });
    });

    //GET: Get's a single user with associate ID
    router.get('/user/:id', function(req, res) {
        User.findOne({_id: req.param }, function(err, user) {
            if (err) throw err;

            res.json(user);
        })
    });

    return router;
};
