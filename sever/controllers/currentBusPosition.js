const express = require('express')
const axios = require('axios')
const router = express.Router()
const BusData = require('../model/busData')

router.get('/', function (req, res) {
  axios.get('http://analytics.dlt.transcodeglobal.com/test_businfo.txt')
    .then(data => {
      var busData = data.data
      busData = Object.values(busData)
      var busDatabase = busData.filter(element => (
        element.path === '39' || element.path === '63' || element.path === '97'
      ))
      console.log(busDatabase.length)
      if (busDatabase.length !== 0) {
        busDatabase.forEach(element => {
          BusData.findOne({ busID: element.busID }, function (err, bus) {
            if (err) throw err;
            if (!bus) {
              var newBusData = BusData({
                path: element.path,
                busID: element.busID,
                speed: element.speed,
                lat: element.lat,
                lng: element.lon,
                time: element.time,
              })
              newBusData.save(function (err) {
                if (err) throw err;
                console.log('save success')
              });
            }
            else {
              BusData.findOneAndUpdate({ busID: element.busID }, {
                speed: element.speed,
                lat: element.lat,
                lng: element.lon,
                time: element.time,
              }, function (err, bus) {
                if (err) throw err;
                console.log('update success')
              })
            }
          })
        })
      }
      console.log(busDatabase)
      res.json({ 'busData': busData })
    })
})


router.get('/busData', function (req, res) {
  BusData.find({}, function (err, data) {
    if (err) throw err;
    res.json({ 'busData': data })
  })
})
module.exports = router
