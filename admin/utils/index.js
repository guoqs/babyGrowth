  function dateFormat(date) {
  	let tDate = new Date(date)
  	let d = tDate.toString() === 'Invalid Date' ? new Date() : tDate
  	let yyyy = d.getFullYear()
  	let mm = d.getMonth() + 1
  	mm = mm > 9 ? mm : '0' + mm
  	let dd = d.getDate()
  	dd = dd > 9 ? dd : '0' + dd
  	let hh = d.getHours()
  	hh = hh > 9 ? hh : '0' + hh
  	let minute = d.getMinutes()
  	minute = minute > 9 ? minute : '0' + minute
  	let ss = d.getSeconds()
  	ss = ss > 9 ? ss : '0' + ss
  	return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + minute + ':' + ss
  }

  //module.exports = dateFormat
  //module.exports = require('./md5')

  module.exports = {
  	dateFormat,
  	md5:require('./md5')
  }