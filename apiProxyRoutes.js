'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/task/list', function(req, res){
  request.get('http://todo.ceresti.com:8080/task/list', 
    function (error, response, body) {
      console.log(body);
      res.send(body);
    }
    );
});

router.post('/task/:id', function(req, res){
  console.log(req.id);
  return;
  request.get('http://todo.ceresti.com:8080/task/'+req.id,
    function(error, response, body){
      res.send(body);
    });
});
//I DON'T THINK THIS WORKS...YET
router.get('/task/:id', function(req, res){
  request.get('http://todo.ceresti.com:8080/task/'+req.id,
    function(error, response, body){
      res.send(body);
    });
});
//NOT YET TESTED
router.put('/task/:id', function(req, res){
  if (req.id){
    res.send('');
  }
  request.put('http://todo.ceresti.com:8080/task/'+req.id, 
    function (error, response, body) {
      console.log(body);
      res.send(body);
    });
});

module.exports = router;