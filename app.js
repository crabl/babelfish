/**
 * Module dependencies.
 */

var express = require('express')
, http = require('http')
, fs = require('fs')
, crypto = require('crypto')
, sys = require('sys')
, buf = require('buffer')
, exec = require('child_process').exec
, path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

function emscripten_compile(fileName, callback) {
    child = exec("server/emscripten/emcc /tmp/"+fileName+".cpp -o /tmp/"+fileName+".js", function (error, stdout, stderr) {
	sys.print('stdout: ' + stdout);
	sys.print('stderr: ' + stderr);
	if (error !== null) {
	    console.log('exec error: ' + error);
	} else {
	    callback(fileName);
	}
    });
}

app.post('/cpp', function(req, res){
    console.log("Got file from client:");
    console.log(req.param('script'));
    var fileName = crypto.randomBytes(16).toString('hex');
    fs.writeFile("/tmp/"+fileName+".cpp", req.param("script"), function(e) {
	if(e) {
	    console.log(e);
	    res.send(500, "FAIL");
	} else {
	    console.log("Wrote file");
	    emscripten_compile(fileName, function(o) {
		if(o == undefined) {
		    console.log(e);
		    res.send(500, "FAIL");
		} else {
		    console.log("Sending File...");
		    res.sendfile("/tmp/"+fileName+".js");
		    console.log("DONE");
		}
	    });
	}
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
