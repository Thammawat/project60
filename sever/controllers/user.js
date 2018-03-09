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

router.get('/adduser', function (req, res) {
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

router.post('/login', function (req, res) {
    User.findOne({ Username: req.body.data.Username }, function (err, user) {
        if (err) throw err;
        res.json({ 'result': bcrypt.compareSync(req.body.data.Password, user.Password) })
    });
})
module.exports = router
