const express = require('express')
const constConfig = require('./admin/const')
const porxy = require('./admin/proxy')
//公用的部分，登录注册等
const commonRouter = require('./admin/common')
//需要登陆的接口 都在这里
const usersRouter = require('./admin/users')
//话题相关（主要是获取话题列表中不需要登录的部分）
const topicsRouter = require('./admin/topics')
//上传文件接口
const uploadRouter = require('./admin/uploadMedia')
//跨域中间件
const cors = require('./admin/middleWares/cors')
//初始化 app
const bbgrowth = express()
//跨域
bbgrowth.use(cors)
//静态资源
//bbgrowth.use('/', express.static(__dirname + '/frontEnd'))
bbgrowth.use('/uploads', express.static(__dirname + '/uploads'))
bbgrowth.get('/phones', function(req, response) {
	porxy().then(function(res) {
		response.end(res)
	})
})
bbgrowth.use('/',commonRouter)
bbgrowth.use('/',usersRouter)
bbgrowth.use('/',uploadRouter)
bbgrowth.use('/',topicsRouter)
bbgrowth.listen(constConfig.port)
//bbgrowth.listen(5858)
