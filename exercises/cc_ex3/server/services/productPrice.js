/**
 * import the seneca package
 */
const seneca = require('seneca')();
const Promise = require('bluebird');
const config = require('../config');

/**
 * Convert act to Promise
 */
const act = Promise.promisify(seneca.client({ host: config.product_price_service.host, port: config.product_price_service.port }).act, { context: seneca });

/**
 * Define Service Method(s)
 */
const GET_PRODUCT_PRICE = { role: 'product', cmd: 'getProductPrice' };

/**
 * Call Service Method(s)
 */
const getProductPrice = function(productId) {
    return act(Object.assign({}, GET_PRODUCT_PRICE, { productId }));
};


module.exports = {
    getProductPrice
};

