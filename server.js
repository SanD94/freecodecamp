 /******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.route('/:time')
  .get(function(req, res){
  const time = req.params.time;
  var result = {
    unix: null,
    natural: null,
  };
  var options = { year: 'numeric', month: 'long', day: 'numeric'};
  var paramDate;
  if (+time >= 0) paramDate = new Date(time*1000);
  else paramDate = new Date(time);
  
  result.unix = paramDate.getTime() / 1000;
  result.natural = paramDate.toLocaleString("en-US", options);
  if (result.natural === "Invalid Date") result.natural =  null;
  
  res.send(result);
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

