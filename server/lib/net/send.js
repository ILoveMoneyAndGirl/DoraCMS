
var http = require('http');
var querystring = require('querystring');
var request = require('request')
var crypto = require('crypto')



const settings = require("../../../configs/settings");

const logUtil = require('../../../utils/middleware/logUtil');





exports.SendData=function(ip,port,path,data,callback){

	return new Promise((resolve, reject) => {
			data=JSON.stringify(data)
			let options = {
			  hostname: ip,
			  port: port,
			  path: path,
			  method: 'POST',
			};
			
			var req = http.request(options, function (res) {

				if(res.statusCode==200)
				{
					res.setEncoding('utf8');
					res.on('data', function (chunk) {
						resolve(chunk)
				    });
				}else
				{
					reject(res.statusCode)
				}

			});

			req.on('error', function (e) {
				reject(e);
			});
			req.write(data);
			req.end();

	});
}

// function getHeader(data){

// 	let tm=Date.now()

// 	let sign=crypto.createHash('md5').update(settings.BulidServerKey+data+tm).digest('hex')
// 	 return {
//         "clientType": settings.Plarform,
//         "clientVersion": settings.Version,
//         "tm":tm,
//         "sign":sign,
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     };
// }