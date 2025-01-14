
let querystring = require('querystring');
let url=require('url');
let http = require('http');
let https = require('https');

exports.PostDataByUrl=function (notifyUrl,data,callback)
{
  let serverInfo =url.parse(notifyUrl)
    let port=80
    let protocol=http
    if(serverInfo.port)
        port=serverInfo.port
    if(serverInfo.protocol=='https:'){
        protocol=https
    }
    PostData(data,serverInfo.hostname,port,serverInfo.path,protocol,callback)
}
function PostData (data,host,port,path,protocol,callback){
  
  var content = JSON.stringify(data)
  var options = {
    hostname: host,
    port: port,
    path: path,
    method: 'POST',
    headers: {
       'Content-Type': 'application/json;charset=utf8',
     }
  };

 var req = protocol.request(options, function (res) {
		if(res.statusCode==200){
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
        chunk=JSON.parse(chunk);
		   		callback(null,chunk)
		    });
		}else{
			callback(res.statusCode)
		}

	});
 req.on('error', function (e) {
  		callback(e)
  });

  req.setTimeout(10000, function(){
     this.abort()
  })

  req.write(content);
  req.end();
}