const { loadUserDataIntoDb, displayData } = require("../services");
const { getResponseObject } = require("../utils/supporter");

class UsageHandler {
    async uploadUserData(requestData, headers) {
        const response = getResponseObject();

        const { sequelize, file } = headers;

        const jsonFilePath = file.path;

        response.data = await loadUserDataIntoDb(sequelize, jsonFilePath);

        return response;
    }
    
    async displayData(requestData, headers) {
        const response = getResponseObject();

        const { sequelize } = headers;

        response.data = await displayData(sequelize);

        return response;
    }
}

module.exports = new UsageHandler();