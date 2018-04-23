var mysqlQuery = require('../mysql')
var utils = require('../utils')
const constConfig = require('../const')
module.exports = function(req, response) {
	//	var queryStr = `SELECT * FROM \`topics\` ORDER BY create_time ASC  LIMIT ${offset},${row}`
	let userId = req[constConfig.userId]
	console.log(userId)
	var regInfo = req[constConfig.body]
	var datetime = utils.dateFormat(new Date()) 
	var queryStr = `INSERT INTO \`topics\` (
					\`user_id\`,
					\`texts\`,
					\`thumbnails\`,
					\`urls\`,
					\`type\`,
					\`create_time\`,
					\`update_time\`
				)
			VALUES
				(
					'${userId}',
					'${regInfo.texts}',
					'${regInfo.thumbnails}',
					'${regInfo.urls}',
					${regInfo.type},
					'${datetime}',
					'${datetime}'
				)`

	mysqlQuery(queryStr).then(function(res) {
		if(!res.data) {
			res.data = []
		}
		response.json(JSON.parse(res))
	}).catch(function() {
		response.json({
			status: 500
		})
	})
}