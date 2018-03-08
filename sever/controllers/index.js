const express = require('express')
const router = express.Router()
router.use('/currentBusPosition',require('./currentBusPosition'))
module.exports = router
