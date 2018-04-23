var mysqlQuery = require('../mysql')
var utils = require('../utils')
module.exports = function  (req,response) {
	var id = req.query.id
//	var queryStr = `SELECT * FROM \`topics\` ORDER BY create_time ASC  LIMIT ${offset},${row}`
	var queryStr = `UPDATE topics SET zan = zan + 1 WHERE id = ${id}`
	
	mysqlQuery(queryStr).then(function (res) {
		response.json({
			message:'',
			status:200,
			data:null
		})
	}).catch(function (){
		response.json({
			status:500
		})
	})
}
