var mysqlQuery = require('../mysql')
var utils = require('../utils')
const constConfig = require('../const')
module.exports = function(req, res, next) {
	var regInfo = req[constConfig.body]
	let userId =  req[constConfig.userId]
	let queryStr = `UPDATE user SET user_head_img = '${regInfo.src}' WHERE user_id = '${userId}'`
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