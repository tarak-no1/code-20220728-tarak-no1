const { getDataBasedOnQuery, getDataCount } = require("../sequelize/index");

const getOverWeightPeopleCount = (sequelize) => {
    const queryData = {
        bmiCategory: "Overweight"
    };
    return getDataCount(sequelize.UserData, queryData);
};

const getUserDataFromTable = (sequelize, currentPage, totalRecords) => {
    const queryData = {
        query: `
            select *
            from "UserData"
            offset :offset limit :limit;
        `,
        replacements: {
            limit: totalRecords,
            offset: currentPage*totalRecords
        }
    };
    return getDataBasedOnQuery(sequelize, queryData);
};

module.exports = async (sequelize, currentPage=0, totalRecords=10) => {
    const dataList = await getUserDataFromTable(sequelize, currentPage, totalRecords);
    const overweightPeopleCount = await getOverWeightPeopleCount(sequelize);

    return {
        userData: dataList,
        totalOverWeightPeople: overweightPeopleCount
    };
};