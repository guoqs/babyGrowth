var express = require('express')
var checkLogin = require('./checkLogin')
var comRouter = express.Router()
//处理post 请求的  格式应该为 'Content-Type:application/x-www-form-urlencoded'
var postRequest = require('../middleWares/postRequest')

comRouter.post('/register', postRequest, require('./register'))
comRouter.post('/login', postRequest, require('./login'))

module.exports = comRouter