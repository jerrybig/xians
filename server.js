var http=require("http");
var fs=require("fs");

http.createServer(function(req,res){
	fs.readFile("./data.json",function(err,data){
		if(!err){
			res.writeHead(200,{
				"content-Type":"application,charset=utf-8",
				"Access-Control-Allow-Origin":"*"
			});
			res.write(data);
			res.end();
		}
	})
}).listen(8888);

console.log("服务器已启动");
