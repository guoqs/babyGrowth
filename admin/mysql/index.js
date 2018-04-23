var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'baby_growth',
//	timezone:  'Asia/Shanghai' 
	timezone:  'Asia/Beijing' 
});

connection.connect();
//connection.end();
function mysqlQuery(sqlString) {
		var promise =  new Promise(function (resolve,reject) {
			 //`SELECT * FROM user  WHERE user_id = 1`
			connection.query(sqlString, function(error, results, fields) {
				if(error) {
					console.log(error)
					reject('500')
					return
				};
	//			resolve(results[0])
				resolve(JSON.stringify({
					success:true,
					data:results,
					status:200
				}))
			});
		})
		return promise

}
module.exports = mysqlQuery