const express = require('express')
const BusGulity = require('../model/busGulity')
const router = express.Router()

router.get('/', function (req, res) {
    BusGulity.find({}, function (err, data) {
        if (err) throw err;
        res.json({ 'busGulity': data })
    })
})



module.exports = router
