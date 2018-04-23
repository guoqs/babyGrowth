var mysqlQuery = require('../mysql')
var utils = require('../utils')
const constConfig = require('../const')
module.exports = function(req, res, next) {
	var regInfo = req[constConfig.body]
	let userId =  req[constConfig.userId]
	console.log(regInfo)
	let queryStr = `UPDATE user SET ${regInfo.type} = '${regInfo.value}' WHERE user_id = '${userId}'`
	console.log(queryStr)
	mysqlQuery(queryStr).then(function () {
		res.json({
			status:200,
			message:'更新成功',
			data:null
		});
	}).catch(function () {
		res.json({
			status:500,
			message:'更新失败',
			data:null
		});
	})

}