module.exports = function (options) {
    // Import the mock data json file
    const mockData = require('./MOCK_DATA.json');

    // Add the patterns and their corresponding functions
    this.add('role:product, cmd:getProductURL', getProductURL);
    this.add('role:product, cmd:getProductName', getProductName);

    function getProductURL({ productId }, callbackFn) {
        callbackFn(null, {
            result: mockData.filter(p => p.product_id === productId).map(p => p.product_url)[0]
        })
    }

    function getProductName({ productId }, callbackFn) {
        callbackFn(null, {
            result: mockData.filter(p => p.product_id === productId).map(p => p.product_name)[0]
        })
    }
};

