
var mysqlQuery = require('../mysql')
var constConfig = require('../const')
module.exports = function (req,response,next) {
	let token = req.headers['token']
//	let token = req.get('token')
	if(!token){
		response.json({
			status:403,
			message:'用户未登录',
			data:null
		})
		return
	} else {
		console.log(mysqlQuery)
		let sqlStr = `SELECT * FROM \`login_info\` WHERE token='${token}'`
		console.log(sqlStr)
		mysqlQuery(sqlStr).then(res => {
			console.log(typeof res)
			let data = JSON.parse(res).data
			if (!data.length) {
				response.json({
					status:403,
					message:'用户登录失效',
					data:null
				})
				return
			}
			req[constConfig.userId] = data[0].user_id
  			next()
		}).catch(err=>{
			response.json({
				status:500,
				message:'服务器偷懒了',
				data:null
			})
		})
	}
}