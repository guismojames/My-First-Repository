var express = require('express');
var https   = require('https');
var http    = require('http');
var read    = require('fs').readFileSync;
var app     = express();

var bind       = '0.0.0.0'; 
var http_port  = 8081;
var https_port = 8444;

var ssl = {
	key: read('ssl/private.key', 'utf8'),
	cert: read('ssl/certificate.pem', 'utf8'),
	ca: [
		read('ssl/ca.pem', 'utf8'),
		read('ssl/intermediate.pem', 'utf8')
	]
};

// http.createServer(app).listen(80);
// https.createServer(options, app).listen(443);

http.createServer(app).listen(http_port, bind, function(){
	console.log("Server listen on "+ bind +":"+http_port+" (HTTP)\n"); 
});
https.createServer(ssl, app).listen(https_port, bind, function(){
	console.log("Server listen on "+ bind +":"+https_port+" (HTTPS)\n"); 
});

app.get('/api', (req, res) => {
    res.json({ foo: "bar" });
});