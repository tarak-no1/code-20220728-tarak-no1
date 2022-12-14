require("dotenv").config();
const displayData = require("../services/displayData");
const sequelize = require("../config/db-config").getSequelizeClient();

describe("Data display Check", () => {
    it('data extraction check from db', async () => {
        const tableData = await displayData(sequelize);
        expect(tableData).toEqual(expect.anything());
    });
});