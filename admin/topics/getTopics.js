var mysqlQuery = require('../mysql')
var utils = require('../utils')
const constConfig = require('../const')
module.exports = function  (req,response) {
	var query = req.query
	let userId =  req[constConfig.userId]
	var row = query.row || 10
	var offset = ((query.page||1) - 1) * row
//	var queryStr = `SELECT * FROM \`topics\` ORDER BY create_time ASC  LIMIT ${offset},${row}`
	var queryStr = `SELECT
		id,
		user_name,
		user_mobile,
		user_nick_name,
		user_head_img,
		texts,
		thumbnails,
		urls,
		type,
		zan,
		create_time,
		update_time,
		user.\`user_id\`,
		topics.\`status\`
	FROM
		\`topics\`
	INNER JOIN \`user\` ON \`topics\`.\`user_id\` = \`user\`.\`user_id\`
	${userId?'WHERE \`user\`.\`user_id\` = \''+userId+'\'':''} 
	ORDER BY create_time DESC
	LIMIT ${offset},${row}`
	console.log(queryStr)
	
//	${userId?'WHERE \`user\`.\`user_id\` = 1:\'\''} 
	mysqlQuery(queryStr).then(function (res) {
		if(!res.data){
			res.data = []
		}
		response.json(JSON.parse(res))
	}).catch(function (){
		response.json({
			status:500
		})
	})
}
