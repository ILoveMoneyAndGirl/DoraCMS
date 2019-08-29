
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
    console.log("PostData:")
    console.log(data)
    console.log(JSON.stringify(data))
  var content = JSON.stringify(data)
  console.log(content)

  var options = {
    hostname: host,
    port: port,
    path: path,
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
       'Content-Length': content.length
     }
  };

 var req = protocol.request(options, function (res) {
		if(res.statusCode==200){
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
        console.log("chunk")
        console.log(chunk)
        chunk=JSON.parse(chunk);
		   		callBack(null,chunk)
		    });
		}else{
			callBack(res.statusCode)
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