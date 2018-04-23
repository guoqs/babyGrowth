const os = require('os');
function getLocalIps(flagIpv6) {
   var ifaces = os.networkInterfaces();
   var ips = [];
   var func = function(details) {
       if (!flagIpv6 && details.family === 'IPv6') {
           return;
       }
       ips.push(details.address);
   };
   for (var dev in ifaces) {
       ifaces[dev].forEach(func);
   }
   return ips;
}
module.exports={
	body:'bbgBody',
	userId:'bbgBodyUserId',
	regTel:/^1[3-9]\d{9}$/,
	currenty:/(^0\.\d{1,2}$)|(^[1-9]\d*(\.\d{1,2})?$)/,
	port:'8889',
	localIds:getLocalIps()
}
