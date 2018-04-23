var express = require('express')
var userRouter = express.Router()
var checkLogin = require('../common/checkLogin')
//处理post 请求的  格式应该为 'Content-Type:application/x-www-form-urlencoded'
var postRequest = require('../middleWares/postRequest')

userRouter.get('/getMyTopics',checkLogin,require('./getTopics'))
userRouter.get('/getTopics',require('./getTopics'))
userRouter.get('/zanTopic',require('./zanTopic'))
userRouter.post('/publishTopic/',checkLogin,postRequest,require('./publishTopic'))

module.exports = userRouter

