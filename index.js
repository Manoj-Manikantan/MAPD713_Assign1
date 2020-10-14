/*
    Group No : 2
    Name : Manoj Manikantan Muralidharan
           Masum Modi
    Date : 14.10.2020
    Assignment1
*/

var SERVER_NAME = 'product-api'
var PORT = 3009;
var HOST = '127.0.0.1';


var restify = require('restify')
  , productData = require('save')('products')
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log(' /products')
  
})
