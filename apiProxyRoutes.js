'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/task/list', function(req, res){
  request('http://todo.ceresti.com:8080/task/list', 
    function (error, response, body) {
      console.log(body);
      res.send(body);
      // if(response.statusCode == 201){
      // } else {
      //   console.log('error: '+ response.statusCode);
      //   console.log(body);
      // }
    }
    );
  // request
  //   .get('http://todo.ceresti.com:8080/task/list')
  //   .on('response', function(response) {
  //       response.on('data', function(data) {
  //         res.send(data);

  //         // compressed data as it is received
  //       });
  //     // console.log(JSON.stringify(response));
  //   });
});

module.exports = router;