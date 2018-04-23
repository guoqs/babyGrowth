var queryString = require('querystring')
var mysqlQuery = require('../mysql')
var utils = require('../utils')
const constConfig = require('../const')
function creatToken (userId,timestamp) {
	var token = utils.md5(userId + (timestamp || (+ new Date()))).split('')
	token.splice(token.length-24,0,'-')
	token.splice(token.length-20,0,'-')
	token.splice(token.length-16,0,'-')
	token.splice(token.length-12,0,'-')
	return token.join('')
}
var token = ''
var errMsg = {
	status:500,
	message:'服务器休息了',
	data:null
}
module.exports = function(req, response) {
		var regInfo = req[constConfig.body]
		var queryStr = `SELECT * FROM \`user\` WHERE user_mobile = '${regInfo.mobile}'`
		mysqlQuery(queryStr).then(function (res) {
			var data = JSON.parse(res)
			var subQueryStr = `SELECT * FROM \`user_authorization\` WHERE user_id = '${data.data[0].user_id}'`
			return mysqlQuery(subQueryStr)
		}).then(function (res) {
			var data = JSON.parse(res).data[0]
			if(data.password === utils.md5(regInfo.password + '' + (+new Date(data.update)))){
				var timestamp = + new Date()
				var token = creatToken(data.user_id,timestamp)
				var successMsg = {
					status:200,
					message:'登录成功',
					data:{token}
				}
				console.log(timestamp)
				var checkExistTokenQuery = `SELECT * FROM \`login_info\` WHERE user_id='${data.user_id}';`
				var setTokenQuery = `INSERT INTO \`login_info\` (\`token\`, \`user_id\`, \`timestamp\`) VALUES ('${token}', '${data.user_id}', '${timestamp}');`
				var updateTokenQuery = `UPDATE \`login_info\` SET \`timestamp\`='${timestamp}',\`token\`='${token}' WHERE (\`user_id\`='${data.user_id}');`
				mysqlQuery(checkExistTokenQuery).then(res => {
					var _res = JSON.parse(res)
					if(_res.data.length){
						return mysqlQuery(updateTokenQuery)
					}else{
						return mysqlQuery(setTokenQuery)
					}
				}).then(res=>{
					response.json(successMsg)
				}).catch(err => {
					response.json(errMsg)
				})
			} else {
				response.json({
					status:401,
					message:'用户名或者密码不对',
					data:null
				})
			}
		}).catch(function (err){
			console.log(err)
			response.json(errMsg)
		})
//		new Promise(function(resolve, reject) {
//			var queryStr = `SELECT * FROM \`user\` WHERE user_mobile = ${regInfo.mobile}`
////			mysqlQuery(queryStr).then(function(data) {
////				console.log(data)
////				resolve(data)
////			}).catch(function(err) {
////				reject('数据库查询错误')
////			})
//			return mysqlQuery(queryStr)
//		}).then(function(data) {
//			console.log('rs  data')
//			console.log(data)
//			res.json(JSON.parse(data))
//		}).catch(function() {
//			res.json({
//
//			})
//		})

}
