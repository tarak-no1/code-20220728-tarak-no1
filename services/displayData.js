const { getDataList } = require("../sequelize/");

const getUserDataFromTable = (sequelize) => {
    const queryData = {};
    return getDataList(sequelize.UserData, queryData);
};

module.exports = async (sequelize) => {
    const dataList = await getUserDataFromTable(sequelize);

    return dataList;
};