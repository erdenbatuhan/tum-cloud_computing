module.exports = function (options) {
    // Import the mock data json file
    const mockData = require('./MOCK_DATA.json');

    // Add the patterns and their corresponding functions
    this.add('role:product, cmd:getProductPrice', getProductPrice);

    // Add the pattern functions and describe the logic inside the function
    function getProductPrice({ productId }, callbackFn) {
        callbackFn(null, {
            result: mockData.filter(p => p.product_id === productId).map(p => p.product_price)[0]
        })
    }
};

