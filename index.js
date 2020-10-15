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
var getRequestCounter = 0;
var postRequestCounter = 0;

var restify = require('restify')
    , productData = require('save')('products')
    , server = restify.createServer({ name: SERVER_NAME })

server.listen(PORT, HOST, function () {
    require('log-timestamp');
    console.log('Server %s listening at %s', server.name, server.url, '/products')
    console.log("Endpoints:")
    console.log("http://127.0.0.1:3009/products method: GET, POST, DELETE")
    console.log("GET method to display all products")
    console.log("POST method to add a new product information")
    console.log("DELETE method to delete all products")
    console.log("==================================")
})

server
    .use(restify.fullResponse())
    .use(restify.bodyParser())
/* To get all products */
server.get('/products', function (req, res, next) {
    getRequestCounter++;
    console.log("products GET: received request")
    console.log("Processed Request Count--> Get:" + getRequestCounter + ", Post:"+ postRequestCounter)
    productData.find({}, function (error, products) {
        res.send(products)
        console.log("products GET: sending response")
        console.log("==================================")
    })
})

/* To add a product information */
server.post('/products', function (req, res, next) {
    postRequestCounter++;
    console.log("products POST: received request")
    console.log("Processed Request Count--> Get:" + getRequestCounter + ", Post:"+ postRequestCounter)
    if (req.params.name === undefined) {
        return next(new restify.InvalidArgumentError('name must be supplied'))
    }
    if (req.params.model === undefined) {
        return next(new restify.InvalidArgumentError('model must be supplied'))
    }
    if (req.params.price === undefined) {
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
        console.log("products POST: sending response")
        console.log("==================================")
    })
})

/* To delete all products */
server.del('/products', function (req, res, next) {
    console.log("products DELETE: received request")
    productData.deleteMany({}, function (error, product) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send()
        console.log("products DELETE: sending response")
        console.log("==================================")
    })
})
