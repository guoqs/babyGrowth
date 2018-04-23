var mysqlQuery = require('../mysql')
var constConfig = require('../const')
module.exports = function (req,response) {
//	var query = req.query
	var userId = req[constConfig.userId]
	console.log(req[constConfig.userId])
	if(!userId){
		response.json({
			status:401,
			message:'参数错误，用户id比传',
			data:null
		})
		return
	}
	var queryStr = `SELECT * FROM \`user\` WHERE user_id = '${userId}'`
	
	mysqlQuery(queryStr).then(data => {
		console.log(data)
		var data = JSON.parse(data).data[0]
		
		if(!data){
			response.json({
				status:403,
				message:'无此用户',
				data:null
			})
			return
		}
		response.json({
			status:200,
			message:'',
			data:data
		})
	}).catch(err=>{
		response.json({
			status:500,
			message:'',
			data:null
		})
	})
}
