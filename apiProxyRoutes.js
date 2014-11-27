'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/task/list', function(req, res){
  request.get('http://todo.ceresti.com:8080/task/list', 
    function (error, response, body) {
      res.send(body);
    }
    );
});

router.put('/task/:id', function(req, res){
  request.put(
    { url : 'http://todo.ceresti.com:8080/task/' + req.params.id,
      json : true,
      body : req.body },
    function(error, response, body){
      res.send(body);
    });
});

router.delete('/task/delete/:id', function(req, res){
  request.del('http://todo.ceresti.com:8080/task/delete/' + req.params.id,
    function(error, response, body){
      res.send(body);
    });
});

router.post('/task/add', function(req, res){
  request.post(
   {  url : 'http://todo.ceresti.com:8080/task/add',
      json : true,
      body : req.body
   },
    function(error, response, body){
      res.send(body);
    });
});

// router.get('/task/:id', function(req, res){
//   request.get('http://todo.ceresti.com:8080/task/'+req.params.id,
//     function(error, response, body){
//       res.send(body);
//     });
// });

module.exports = router;