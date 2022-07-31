const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const DBConfig = require("./db-config");

class AppConfig {
    constructor(app) {
        this.app = app;
    }
    loadAppLevelConfig() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use((req, res, next) => {
            if (req && !req.headers["x-correlation-id"]) {
				req.x_correlation_id = uuid.v4();
				res.setHeader("X-Correlation-ID", req.x_correlation_id);
			}
			next();
        });
    }
    loadExpressConfig() {
        this.app.set("view engine", "html");
    }
    loadDbConfig() {
        const sequelize = DBConfig.getSequelizeClient();
        this.app.use((req, res, next) => {
            req.headers.sequelize = sequelize;
            next();
        });
    }
    includeConfig() {
        this.loadAppLevelConfig();
        this.loadExpressConfig();
        this.loadDbConfig();
    }
}

module.exports = AppConfig;