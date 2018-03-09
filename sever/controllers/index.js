const express = require('express')
const router = express.Router()
router.use('/currentBusPosition',require('./currentBusPosition'))
router.use('/roadData',require('./roadData'))
router.use('/user',require('./user'))
router.use('/busGulity',require('./busGulity'))
module.exports = router
