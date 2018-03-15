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
    let userData = []
    if ((bcrypt.compareSync(req.body.data.adminUsername, req.body.data.token)) && req.body.data.adminStatus === "admin" || req.body.data.adminStatus === "assistant") {
        User.find({ username: req.body.data.username }, function (err, data) {
            if (err) throw err;
            userData = data
        })
            .then(() => {
                if (userData.length === 0) {
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
                    res.json({ 'result': 'Username is same' })
                }
            })
    }
    else {
        res.json({ 'result': 'fail' })
    }
})

router.post('/removeUser', function (req, res) {
    if ((bcrypt.compareSync(req.body.data.adminUsername, req.body.data.token)) && req.body.data.adminStatus === "admin" || req.body.data.adminStatus === "assistant") {
        User.findOneAndRemove({ username: req.body.data.username }, function (err) {
            if (err) throw err;
            // we have deleted the user
            res.json({ 'result': 'User remove success' })
        });
    }
    else {
        res.json({ 'result': 'fail' })
    }
})

router.post('/editStatusUser', function (req, res) {
    if ((bcrypt.compareSync(req.body.data.adminUsername, req.body.data.token)) && req.body.data.adminStatus === "admin" || req.body.data.adminStatus === "assistant") {
        User.findOneAndUpdate({ username: req.body.data.username }, { status: req.body.data.userStatus }, function (err, bus) {
            if (err) throw err;
            //         if (err) throw err;
            res.json({ 'result': 'User edit success' })
        })
    }
    else {
        res.json({ 'result': 'fail' })
    }
})


router.post('/editPasswordUser', function (req, res) {
    if (bcrypt.compareSync(req.body.data.username, req.body.data.token)) {
        User.findOne({ username: req.body.data.username }, function (err, user) {
            if (bcrypt.compareSync(req.body.data.password, user.password)) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) return next(err);
                    bcrypt.hash(req.body.data.newPassword, salt, null, function (err, hash) {
                        if (err) return next(err);
                        User.findOneAndUpdate({ username: req.body.data.username }, { password: hash }, function (err, user) {
                            if (err) throw err;
                            user.firstname = user.firstname
                            user.lastname = user.lastname
                            user.username = user.lastname
                            user.password = hash
                            user.status = user.status
                            res.json({ 'result': 'User change password success','userData': user })
                        })
                    });
                });
            }
            else {
                res.json({ 'result': 'fail old password is not true' })
            }
        });
    }
    else {
        res.json({ 'result': 'fail' })
    }
})

router.post('/editProfileUser', function (req, res) {
    let userData = null
    if (bcrypt.compareSync(req.body.data.username, req.body.data.token)) {
        User.findOneAndUpdate({ username: req.body.data.username }, { username: req.body.data.newUsername, firstname: req.body.data.newFirstname, lastname: req.body.data.newLastname }, function (err, user) {
            if (err) throw err;
            user.firstname = req.body.data.newFirstname
            user.lastname = req.body.data.newLastname
            user.username = req.body.data.newUsername
            user.password = user.password
            user.status = user.status
            bcrypt.genSalt(10, function (err, salt) {
                if (err) return next(err);
                // hash the password using our new salt
                bcrypt.hash(req.body.data.newUsername, salt, null, function (err, hash) {
                    if (err) return next(err);
                    res.json({ 'result': 'User edit success', 'token': hash, 'userData': user })
                });
            });
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
