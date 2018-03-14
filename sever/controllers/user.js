const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt-nodejs');

router.get('/', function (req, res) {
    // if (bcrypt.compareSync(req.body.data.adminUsername, req.body.data.token)) {
    //     User.find({}, function (err, data) {
    //         if (err) throw err;
    //         res.json({ 'user': data })
    //     })
    // }
    // else {
    //     res.json({ 'result': 'fail' })
    // }
    User.find({}, function (err, data) {
        if (err) throw err;
        res.json({ 'user': data })
    })
})

router.get('/addAdmin', function (req, res) {
    var newUser = User({
        firstname: 'admin',
        lastname: 'admin',
        username: 'admin',
        password: 'admin',
        status: 'admin',
    });
    newUser.save(function (err) {
        if (err) throw err;
        res.json({ 'result': 'User has Created' })
    });
})

router.post('/addUser', function (req, res) {
    if (bcrypt.compareSync(req.body.data.adminUsername, req.body.data.token)) {
        User.findOne({ username: req.body.data.adminUsername }, function (err, user) {
            if (user.status === "admin" || user.status === "assistant") {
                var newUser = User({
                    firstname: req.body.data.firstname,
                    lastname: req.body.data.lastname,
                    username: req.body.data.username,
                    password: req.body.data.password,
                    status: req.body.data.status,
                });
                newUser.save(function (err) {
                    if (err) throw err;
                    res.json({ 'result': 'User has Created' })
                });
            }
            else {
                res.json({ 'result': 'User role error' })
            }
        })
    }
    else {
        res.json({ 'result': 'fail' })
    }
})

router.post('/removeUser', function (req, res) {
    if (bcrypt.compareSync(req.body.data.adminUsername, req.body.data.token)) {
        User.findOne({ username: req.body.data.adminUsername }, function (err, user) {
            if (user.status === "admin" || user.status === "assistant") {
                User.findOneAndRemove({ username: req.body.data.username }, function (err) {
                    if (err) throw err;
                    // we have deleted the user
                    res.json({ 'result': 'User remove success' })
                });
            }
            else {
                res.json({ 'result': 'User role error' })
            }
        })
    }
    else {
        res.json({ 'result': 'fail' })
    }
})

router.post('/login', function (req, res) {
    console.log(req.body)
    User.findOne({ username: req.body.data.username }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ 'result': 'fail' })
        } else {
            if (bcrypt.compareSync(req.body.data.password, user.password)) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) return next(err);
                    // hash the password using our new salt
                    bcrypt.hash(user.username, salt, null, function (err, hash) {
                        if (err) return next(err);
                        res.json({ 'result': 'success', 'token': hash, 'userData': user })
                    });
                });
            }
            else {
                res.json({ 'result': 'fail' })
            }
        }
    });

})
module.exports = router
