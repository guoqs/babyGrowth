const constConfig = require('../const')
const queryString = require('querystring')

//处理post 请求的  格式应该为 'Content-Type:application/x-www-form-urlencoded'
module.exports=function (req,res,next){
	var rBody = ''
	req.on('data', function(chunk) {
		rBody += chunk
	});
	req.on('end', function(chunk) {
		req[constConfig.body] = queryString.parse(rBody)
		console.log(req[constConfig.body])
	    setTimeout(function () {
			next()
	    },1000)
	})
}
