const express = require('express')
const router = express.Router()
const Road = require('../model/road')
const RoadMapBus = require('../model/roadMapBus')
const RoadBusStop = require('../model/roadBusStop')

router.get('/', function (req, res) {
    Road
        .find({})
        .populate('roadMapBus')
        .exec(function (err, data) {
            if (err) throw err;
            res.json({ 'roadData': data })
        })
})

router.get('/busStop', function (req, res) {
    RoadBusStop.find({}, function (err, data) {
        if (err) throw err;
        res.json({ 'busStop': data })
    })
})



module.exports = router
