var express = require('express')
var testRouter = express.Router()
testRouter.post('/getUsers',require('./getUser'))
testRouter.post('/getPassword',require('./getPassword'))
module.exports = testRouter