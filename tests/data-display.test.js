require("dotenv").config();
const displayData = require("../services/displayData");
const sequelize = require("../config/db-config").getSequelizeClient();

describe("Data display Check", () => {
    it('data exists check', async () => {
        const tableData = await displayData(sequelize);
        expect(tableData).not.toHaveLength(0);
    });

});