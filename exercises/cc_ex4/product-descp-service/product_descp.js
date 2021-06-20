module.exports = function (options) {
    // Import the mock data json file
    const mockData = require('./MOCK_DATA.json');

    // Add the patterns and their corresponding functions
    this.add('role:product, cmd:getProductURL', getProductURL);
    this.add('role:product, cmd:getProductName', getProductName);

    function getProductURL({ productId }, callbackFn) {
        callbackFn(null, {
            result: mockData.find(p => p["product_id"] === productId)["product_url"]
        })
    }

    function getProductName({ productId }, callbackFn) {
        callbackFn(null, {
            result: mockData.find(p => p["product_id"] === productId)["product_name"]
        })
    }
};

