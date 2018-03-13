const express = require('express')
const router = express.Router()
const Road = require('../model/road')
const RoadMapBus = require('../model/roadMapBus')
const RoadBusStop = require('../model/roadBusStop')
const BusContract = require('../model/busContract')

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

router.post('/findRoadPath', function (req, res) {
    //findRoadPath = (busStop1, busStop2)
    let roadBusStop = []
    let finalRoadPath = []
    let contactPath = []
    let start = []
    let end = []
    let contract = []
    let path = []
    let contract1 = []
    RoadBusStop.find({}, function (err, data) {
        roadBusStop = data
    }).then(() => {
        BusContract.find({}, function (err, data) {
            contactPath = data
        }).then(() => {
            for (var j = 0; j < roadBusStop.length; j++) {
                const startPath = roadBusStop[j].busStop.filter(element => (
                    element.nameTH === req.body.data.busStop1
                ))
                const endPath = roadBusStop[j].busStop.filter(element => (
                    element.nameTH ===  req.body.data.busStop2
                ))
                if (startPath.length !== 0) {
                    start.push({ pathStart: 0, path: roadBusStop[j].busRoad })
                }
                if (endPath.length !== 0) {
                    end.push({ pathEnd: 0, path: roadBusStop[j].busRoad })
                }
            }
            console.log(start)
            console.log(end)

            for (var j = 0; j < start.length; j++) {
                var samePath = end.filter(element => (
                    element.path === start[j].path
                ))
                if (samePath.length !== 0) {
                    path.push(start[j].path)
                }
            }

            if (path.length !== 0) {
                var roadPath = []
                var busStopPath = roadBusStop.filter(element => (
                    element.busRoad === path[0]
                ))
                var pathStart = busStopPath[0].busStop.filter(element => (
                    element.nameTH ===  req.body.data.busStop1
                ))
                var pathEnd = busStopPath[0].busStop.filter(element => (
                    element.nameTH ===  req.body.data.busStop2
                ))
                var startSequence = pathStart[0].sequence
                var endSequence = pathEnd[0].sequence
                if (startSequence < endSequence) {
                    res.json({ 'roadPath': path })
                }
                else {
                    res.json({ 'result': 'error on data' })
                }
            }
            else {
                for (var j = 0; j < start.length; j++) {
                    end.forEach(endData => {
                        var endContact = contactPath.filter(element => (
                            element.busRoad === endData.path
                        ))
                        var result = endContact[0].contract.filter(element => (
                            element.contractWith === start[j].path
                        ))
                        if (result.length !== 0) {
                            contract.push({ start: start[j], end: endData })
                        }
                    })
                }
                start.forEach(data => {
                    var startContact = contactPath.filter(element => (
                        element.busRoad === data.path
                    ))
                    startContact[0].contract.forEach(element => {
                        start.push({ pathStart: startContact[0].busRoad, path: element.contractWith })
                    })
                })
                end.forEach(data => {
                    var endContact = contactPath.filter(element => (
                        element.busRoad === data.path
                    ))
                    endContact[0].contract.forEach(element => {
                        end.push({ pathEnd: endContact[0].busRoad, path: element.contractWith })
                    })
                })
                console.log(start)
                console.log(end)
                for (var j = 1; j < start.length; j++) {
                    end.forEach(endData => {
                        var endContact = contactPath.filter(element => (
                            element.busRoad === endData.path
                        ))
                        var result = endContact[0].contract.filter(element => (
                            element.contractWith === start[j].path
                        ))
                        if (result.length !== 0) {
                            contract.push({ start: start[j], end: endData })
                        }
                    })
                }
                var answer = []
                for (var i = 0; i < contract.length; i++) {
                    var roadPath = []
                    var roadPathStart = []
                    var roadPathEnd = []
                    var testStart = contract[i].start
                    if (testStart.pathStart === 0) {
                        roadPathStart.push(testStart.path)
                    }
                    else {
                        while (testStart.pathStart !== 0) {
                            roadPathStart.push(testStart.path)
                            roadPathStart.push(testStart.pathStart)
                            var result = start.filter(element => (
                                element.path === testStart.pathStart
                            ))
                            testStart = result[0]
                        }
                    }
                    var test = contract[i].end
                    if (test.pathEnd === 0) {
                        roadPathEnd.push(test.path)
                    }
                    else {
                        while (test.pathEnd !== 0) {
                            roadPathEnd.push(test.path)
                            roadPathEnd.push(test.pathEnd)
                            var result = end.filter(element => (
                                element.path === test.pathEnd
                            ))
                            test = result[0]
                        }
                    }
                    roadPathStart = roadPathStart.reverse()
                    roadPath = roadPathStart.concat(roadPathEnd)
                    answer.push({ roadPath: roadPath })
                }
                var minRoadPath = 0
                answer.forEach((element, index) => {
                    if (index === 0) {
                        minRoadPath = element.roadPath.length
                    }
                    else {
                        if (element.roadPath.length < minRoadPath)
                            minRoadPath = element.roadPath.length
                    }
                })
                console.log(minRoadPath)
                answer = answer.filter(element => (element.roadPath.length === minRoadPath))
                answer.forEach((answer, index) => {
                    var busStopPathStart = roadBusStop.filter(element => (
                        element.busRoad === answer.roadPath[0]
                    ))
                    var contractStart = contactPath.filter(element => (
                        element.busRoad === answer.roadPath[0]
                    ))
                    var resultStart = busStopPathStart[0].busStop.filter(element => (
                        element.nameTH ===  req.body.data.busStop1
                    ))
                    var startSequence = resultStart[0].sequence
                    var contractWithStart = contractStart[0].contract.filter(element => (
                        element.contractWith === answer.roadPath[1]
                    ))
                    var resultPathStart = contractWithStart[0].path.filter(element => (
                        element.sequence > startSequence
                    ))
                    var busStopPathEnd = roadBusStop.filter(element => (
                        element.busRoad === answer.roadPath[answer.roadPath.length - 1]
                    ))
                    var contractEnd = contactPath.filter(element => (
                        element.busRoad === answer.roadPath[answer.roadPath.length - 1]
                    ))
                    var resultEnd = busStopPathEnd[0].busStop.filter(element => (
                        element.nameTH ===  req.body.data.busStop2
                    ))
                    var endSequence = resultEnd[0].sequence
                    var contractWithEnd = contractEnd[0].contract.filter(element => (
                        element.contractWith === answer.roadPath[answer.roadPath.length - 2]
                    ))
                    var resultPathEnd = contractWithEnd[0].path.filter(element => (
                        element.sequence < endSequence
                    ))

                    if (resultPathStart.length !== 0 && resultPathEnd.length !== 0) {
                        finalRoadPath.push(answer)
                    }
                })
                if(finalRoadPath.length !== 0)
                {
                    res.json({ 'roadPath': finalRoadPath })
                }
                else{
                    res.json({ 'result': 'error on data'})
                }
            }
        })
    })
})



module.exports = router
