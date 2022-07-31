const { SequelizeClient } = require("../sequelize");

class DBConfig {
	constructor() {
		// Sequelize DB Details
		this.sequelizeDBNAME = process.env.SEQUELIZE_DB_NAME;
		this.sequelizeDBDIALECT = process.env.SEQUELIZE_DB_DIALECT;
		this.sequelizeDBHost = process.env.SEQUELIZE_DB_HOST;
		this.sequelizeDBPort = process.env.SEQUELIZE_DB_PORT;

		this.sequelizeDBUsername = process.env.DB_USER;
		this.sequelizeDBPassword = process.env.DB_PASSWORD;
	}

	getSequelizeClient() {
		const config = {
            database: this.sequelizeDBNAME,
            dialect: this.sequelizeDBDIALECT,
            host: this.sequelizeDBHost,
            port: this.sequelizeDBPort,
            username: this.sequelizeDBUsername,
            password: this.sequelizeDBPassword,
            logging: false,
            pool: {
                max: 4,
                min: 0,
                idle: 20000,
                acquire: 30000
            }
        };
		return new SequelizeClient(config).getClient();
	}
}

module.exports = new DBConfig();
