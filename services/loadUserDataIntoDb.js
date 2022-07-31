const fs = require("fs");
const JSONStream = require('JSONStream');
const es = require('event-stream');
const { createBulkData } = require("../sequelize/");
const { getBMI, getHealthRisk, getBMICategory } = require("../utils/supporter");

const getStream = function (jsonFilePath) {
    const stream = fs.createReadStream(jsonFilePath, { encoding: 'utf8' }),
        parser = JSONStream.parse('*');
    return stream.pipe(parser);
};

const loadUserDataIntoDbTable = async(model, dataToLoad) => {
    console.log(dataToLoad)
    return createBulkData(model, dataToLoad, {});
}

const transformData = (data) => {
    const height = data.HeightCm;
    const weight = data.WeightKg;
    const bmi = getBMI(weight, height);
    const transformatedData = {
        gender: data.Gender,
        height,
        weight,
        bmi,
        bmiCategory: getBMICategory(bmi),
        healthRisk: getHealthRisk(bmi)
    };
    return transformatedData;
};

module.exports = (sequelize, jsonFilePath) => {
    let dataToLoad = [];
    getStream(jsonFilePath)
        .pipe(es.mapSync((data) => {
            const requiredDataFormat = transformData(data);
            dataToLoad.push(requiredDataFormat);
            if(dataToLoad.length > 5000) {
                loadUserDataIntoDbTable(sequelize.UserData, dataToLoad)
                    .then(result => {console.log(result)});
                dataToLoad = [];
            }
        })).on("end", () => {
            if(dataToLoad.length > 0) {
                loadUserDataIntoDbTable(sequelize.UserData, dataToLoad)
                    .then(result => {console.log(result)});
            }
            fs.unlinkSync(jsonFilePath);
        });
    return true;
};
