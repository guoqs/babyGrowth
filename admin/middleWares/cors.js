module.exports=function (req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'token');
    res.header('Access-Control-Request-Method', 'GET,POST');
    next()
//  setTimeout(next,500)
//  res.json({
//  	status:503
//  })
}