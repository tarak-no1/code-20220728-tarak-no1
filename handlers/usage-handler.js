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

    displayDataParams() {
        return [
            { type: "int", value: "current_page", is_optional: true },
            { type: "int", value: "total_records", is_optional: true },
        ];
    }
    
    async displayData(requestData, headers) {
        const response = getResponseObject();

        const { sequelize } = headers;
        const currentPage = requestData.current_page;
        const totalRecords = requestData.total_records;

        response.data = await displayData(sequelize, currentPage, totalRecords);

        return response;
    }
}

module.exports = new UsageHandler();