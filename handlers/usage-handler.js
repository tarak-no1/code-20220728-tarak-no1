const { getResponseObject } = require("../utils/supporter");

class UsageHandler {
    async uploadUserData(requestData, headers) {
        const response = getResponseObject();
        console.log(headers);
        console.log(JSON.stringify(requestData, null, 2));

        const { sequelize } = headers;

        return response;
    }
}

module.exports = new UsageHandler();