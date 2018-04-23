var express = require('express')
var checkLogin = require('../common/checkLogin')
var userRouter = express.Router()
//处理post 请求的  格式应该为 'Content-Type:application/x-www-form-urlencoded'
var postRequest = require('../middleWares/postRequest')
userRouter.use('/user/*', checkLogin);
userRouter.post('/user/updateHeadimg',postRequest,require('./updateHeadimg'))
userRouter.post('/user/updeteInfo',postRequest,require('./updeteInfo'))
userRouter.get('/user/getUserList',require('./getUserList'))
userRouter.get('/user/getInfo',require('./getUserInfo'))

module.exports = userRouter

