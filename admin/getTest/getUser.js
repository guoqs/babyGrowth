var queryString = require('querystring')
var mysqlQuery = require('../mysql')
var utils = require('../utils')
module.exports = function (req,res) {
	new Promise(function(resolve, reject) {
		var queryStr = `SELECT * FROM \`user\``
		mysqlQuery(queryStr).then(function(data) {
			console.log(data)
			resolve(data)
		}).catch(function(err) {
			reject('数据库查询错误')
		})
	}).then(function (data) {
		res.json(JSON.parse(data))
	}).catch(function () {
		res.json({
			
		})
	})
}