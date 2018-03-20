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
                    element.nameTH === req.body.data.busStop2
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
                    element.nameTH === req.body.data.busStop1
                ))
                var pathEnd = busStopPath[0].busStop.filter(element => (
                    element.nameTH === req.body.data.busStop2
                ))
                var startSequence = pathStart[0].sequence
                var endSequence = pathEnd[0].sequence
                if (startSequence < endSequence) {
                    res.json({ 'result':'success','roadPath': path })
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
                        element.nameTH === req.body.data.busStop1
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
                        element.nameTH === req.body.data.busStop2
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
                if (finalRoadPath.length !== 0) {
                    res.json({ 'result':'success','roadPath': finalRoadPath })
                }
                else {
                    res.json({ 'result': 'error on data' })
                }
            }
        })
    })
})



router.post('/roadPathWay', function (req, res) {
    //roadPathWay = (startPlace, endPlace, roadPath) 
    let roadBusStop = []
    let roadMapBus = []
    let contactPath = []
    let roadWay = []
    let inItPath = null
    RoadBusStop.find({}, function (err, data) {
        roadBusStop = data
    }).then(() => {
        RoadMapBus.find({}, function (err, data) {
            roadMapBus = data
        }).then(() => {
            BusContract.find({}, function (err, data) {
                contactPath = data
            }).then(() => {
                var i = 0;
                if (req.body.data.roadPath.length === 1) {
                    var busStopPath = roadBusStop.filter(element => (
                        element.busRoad === req.body.data.roadPath[0]
                    ))
                    var pathStart = busStopPath[0].busStop.filter(element => (
                        element.nameTH === req.body.data.startPlace
                    ))
                    var pathEnd = busStopPath[0].busStop.filter(element => (
                        element.nameTH === req.body.data.endPlace
                    ))
                    var startSequence = pathStart[0].sequence
                    var endSequence = pathEnd[0].sequence
                    var roadMap = roadMapBus.filter(element => (
                        element.busRoad === req.body.data.roadPath[0]
                    ))
                    var path = roadMap[0].roadMap.filter(element => (
                        element.index >= busStopPath[0].busStop[startSequence].roadIndex &&
                        element.index <= busStopPath[0].busStop[endSequence].roadIndex
                    ))
                    roadWay = roadWay.concat(path)
                    console.log(path)
                }
                else {
                    for (var i = 0; i < req.body.data.roadPath.length; i++) {
                        if (i === 0) {
                            var busStopPath = roadBusStop.filter(element => (
                                element.busRoad === req.body.data.roadPath[0]
                            ))
                            var contract = contactPath.filter(element => (
                                element.busRoad === req.body.data.roadPath[0]
                            ))
                            var result = busStopPath[0].busStop.filter(element => (
                                element.nameTH === req.body.data.startPlace
                            ))
                            var startSequence = result[0].sequence
                            //console.log(startSequence)
                            var contractWith = contract[0].contract.filter(element => (
                                element.contractWith === req.body.data.roadPath[1]
                            ))
                            var resultPath = contractWith[0].path.filter(element => (
                                element.sequence > startSequence
                            ))
                            var endSequence = resultPath[0].sequence
                            inItPath = resultPath[0].contractAt
                            //console.log(endSequence)
                            var roadMap = roadMapBus.filter(element => (
                                element.busRoad === req.body.data.roadPath[0]
                            ))
                            // console.log(busStopPath[0].busStop[startSequence])
                            // console.log(busStopPath[0].busStop[endSequence])
                            var path = roadMap[0].roadMap.filter(element => (
                                element.index >= busStopPath[0].busStop[startSequence].roadIndex &&
                                element.index <= busStopPath[0].busStop[endSequence].roadIndex
                            ))
                            //console.log(roadMap[0].roadMap)
                            roadWay = roadWay.concat(path)
                            console.log(path)
                        }
                        else if (i === req.body.data.roadPath.length - 1) {
                            var busStopPath = roadBusStop.filter(element => (
                                element.busRoad === req.body.data.roadPath[i]
                            ))
                            var result = busStopPath[0].busStop.filter(element => (
                                element.nameTH === req.body.data.endPlace
                            ))
                            var endSequence = result[0].sequence
                            var roadMap = roadMapBus.filter(element => (
                                element.busRoad === req.body.data.roadPath[i]
                            ))
                            var path = roadMap[0].roadMap.filter(element => (
                                element.index >= busStopPath[0].busStop[inItPath].roadIndex &&
                                element.index <= busStopPath[0].busStop[endSequence].roadIndex
                            ))
                            console.log("-------------------")
                            console.log(path)
                            console.log(inItPath)
                            roadWay = roadWay.concat(path)
                        }
                        else {
                            var busStopPath = roadBusStop.filter(element => (
                                element.busRoad === req.body.data.roadPath[i]
                            ))
                            var contract = contactPath.filter(element => (
                                element.busRoad === req.body.data.roadPath[i]
                            ))
                            var contractWith = contract[0].contract.filter(element => (
                                element.contractWith === req.body.data.roadPath[i + 1]
                            ))
                            var startSequence = inItPath
                            var resultPath = contractWith[0].path.filter(element => (
                                element.sequence > inItPath
                            ))
                            var endSequence = resultPath[0].sequence
                            inItPath = resultPath[0].contractAt
                            var roadMap = roadMapBus.filter(element => (
                                element.busRoad === req.body.data.roadPath[i]
                            ))
                            var path = roadMap[0].roadMap.filter(element => (
                                element.index >= busStopPath[0].busStop[startSequence].roadIndex &&
                                element.index <= busStopPath[0].busStop[endSequence].roadIndex
                            ))
                            console.log("xxxxxxxxxxxx")
                            console.log(path)
                            roadWay = roadWay.concat(path)
                        }
                    }
                }
                console.log('roadWayyy')
                console.log(roadWay)
                res.json({ 'roadWay': roadWay })
            })
        })
    })
})


module.exports = router
