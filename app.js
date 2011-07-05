var express = require('express');
var sys = require("sys"),
        request = require('request');
    
var io = require('socket.io');
var http = require('http');
var langUrl = 'https://www.googleapis.com/language/translate/v2';
var allLangsUrl = '/languages?target=en&key=';

var startApp = function (langs) {
    console.log(langs);
    var app = express.createServer();
    // Configuration
    app.configure(function(){
        app.set('views', __dirname + '/views');
        app.use(express.bodyParser());
        //app.use(express.methodOverride());
        app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
        app.use(app.router);
        app.use(express.staticProvider(__dirname + '/public'));
    });
    
    app.get('/', function(req, res){
        res.render('main.ejs');
    });
   
};
  
startApp('');
