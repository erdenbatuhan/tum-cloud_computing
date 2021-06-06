/**
 * BASE SETUP
 * import the packages we need
 */
const express = require('express');

/**
 * import the Services we need
 */
const helloWorldService = require('./services/helloWorld');
const productDescpService = require('./services/productDescp');
const productPriceService = require('./services/productPrice');

/**
 * javascript promises for join function
 */
const join = require("bluebird").join;

const app = express();

const router = express.Router();

/**
 * Middleware to use for all requests
 */
router.use(function(req, res, next) {
    /**
     * Logs can be printed here while accessing any routes
     */
    console.log('Accessing Exercises Routes');
    next();
});

/**
 * Base route of the router : to make sure everything is working check http://localhost:8080/exercises)
 */
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to Cloud Computing Exercises API!'});
});

/**
 * Exercise 3:
 */
// Query params: name & productId
router.route('/exercise3/:name/:productId').get(function(req, res) {
    let name = req.params.name;
    let productId = req.params.productId;

    join(
        helloWorldService.sayWelcome(name),
        productDescpService.getProductURL(productId),
        productDescpService.getProductName(productId),
        productPriceService.getProductPrice(productId),
        (sayWelcomeResult, getProductURLResult, getProductNameResult, getProductPriceResult) => {
            res.send({
                "hello": sayWelcomeResult.result,
                "product_id": productId,
                "productURL": getProductURLResult.result,
                "productPrice": getProductNameResult.result,
                "productName": getProductPriceResult.result
            });
        }
    );
});

/**
 * REGISTER OUR ROUTES
 * our router is now pointing to /api
 */
app.use('/api', router);


module.exports = app;

