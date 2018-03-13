const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt');

router.get('/', function (req, res) {
    User.find({}, function (err, data) {
        if (err) throw err;
        res.json({ 'user': data })
    })
})

router.get('/addAdmin', function (req, res) {
    var newUser = User({
        firstname: 'eqweqwewqewqew',
        lastname: 'wqeqwewqewqe',
        username: 'DISSSSSVAA',
        password: 'qwewqewqewqeqwew',
        status: 'admin',
    });
    newUser.save(function (err) {
        if (err) throw err;
        res.json({ 'result': 'User has Created' })
    });
})

router.post('/addUser', function (req, res) {
    var newUser = User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        status: req.body.status,
    });
    newUser.save(function (err) {
        if (err) throw err;
        res.json({ 'result': 'User has Created' })
    });
})

router.post('/login', function (req, res) {
    User.findOne({ username: req.body.data.username }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ 'result': 'fail' })
        } else {
            if (bcrypt.compareSync(req.body.data.password, user.password)) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) return next(err);
                    // hash the password using our new salt
                    bcrypt.hash(user.username, salt, function (err, hash) {
                        if (err) return next(err);
                        res.json({ 'result':'success','token': hash })
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
