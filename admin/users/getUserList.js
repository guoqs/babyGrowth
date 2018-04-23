var mysqlQuery = require('../mysql')
var utils = require('../utils')
module.exports = function  (req,response) {
	var query = req.query
	var row = query.row || 10
	var offset = ((query.page||1) - 1) * row
	var queryStr = `SELECT * FROM \`user\` ORDER BY create_datetime ASC  LIMIT ${offset},${row}`
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
