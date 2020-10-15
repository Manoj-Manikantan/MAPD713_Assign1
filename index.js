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
    , server = restify.createServer({ name: SERVER_NAME })

server.listen(PORT, HOST, function () {
    console.log('Server %s listening at %s', server.name, server.url, '/products')
})

server
    .use(restify.fullResponse())
    .use(restify.bodyParser())

/* To get all products */    
server.get('/products', function (req, res, next) {
    productData.find({}, function (error, products) {
        res.send(products)
    })
})

/* To add a product */
server.post('/products', function (req, res, next) {
    if (req.params.name === undefined ) {
      return next(new restify.InvalidArgumentError('name must be supplied'))
    }
    if (req.params.model === undefined ) {
      return next(new restify.InvalidArgumentError('model must be supplied'))
    }
    if (req.params.price === undefined ) {
        return next(new restify.InvalidArgumentError('price must be supplied'))
      }
    var newProduct = {
          name: req.params.name, 
          model: req.params.model,
          price: req.params.price
      }
      productData.create(newProduct, function (error, product) {
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
      res.send(201, product)
    })
  })
