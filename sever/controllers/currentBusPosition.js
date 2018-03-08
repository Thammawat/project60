const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/',function(req,res){
  axios.get('http://analytics.dlt.transcodeglobal.com/test_businfo.txt')
  .then(data =>{
    var busData= data.data
    busData = Object.values(busData)
    var busFromUrl = busData.filter(element =>(
      element.path === "39"
    ))
    res.json({'busData' : busFromUrl})
  })
})

module.exports = router
