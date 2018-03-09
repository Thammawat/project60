const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/',function(req,res){
  axios.get('http://analytics.dlt.transcodeglobal.com/test_businfo.txt')
  .then(data =>{
    var busData= data.data
    busData = Object.values(busData)
    res.json({'busData' : busData})
  })
})

module.exports = router
