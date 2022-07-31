const fs = require("fs");
const JSONStream = require('JSONStream');
const es = require('event-stream');
const { createBulkData } = require("../sequelize/");
const { transformData } = require("../utils/supporter");

const getStream = function (jsonFilePath) {
    const stream = fs.createReadStream(jsonFilePath, { encoding: 'utf8' }),
        parser = JSONStream.parse('*');
    return stream.pipe(parser);
};

const loadUserDataIntoDbTable = async(model, dataToLoad) => {
    return createBulkData(model, dataToLoad, {});
}

module.exports = (sequelize, jsonFilePath) => {
    let dataToLoad = [];
    getStream(jsonFilePath)
        .pipe(es.mapSync((data) => {
            const requiredDataFormat = transformData(data);
            dataToLoad.push(requiredDataFormat);
            if(dataToLoad.length > 5000) {
                loadUserDataIntoDbTable(sequelize.UserData, dataToLoad)
                    .then(result => {console.log(result);});
                dataToLoad = [];
            }
        })).on("end", () => {
            if(dataToLoad.length > 0) {
                loadUserDataIntoDbTable(sequelize.UserData, dataToLoad)
                    .then(result => {console.log(result);});
            }
            fs.unlinkSync(jsonFilePath);
        });
    return true;
};
