const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const CONSTANTS = require("../utils/constants");
const initModels = require("./models/init-models");

const basename = path.basename(__filename);

class SequelizeClient {
	constructor(dbConfig) {
		this.dbConfig = dbConfig;
	}

	getClient() {
        const dbPath = this.dbConfig;
        const db = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);

        db
            .authenticate()
            .then(() => {
                console.log(`${dbPath.database } Sequelize Connection has been established successfully.`);
            })
            .catch(err => {
                console.log(`Unable to connect to the database:${ dbPath.database}` , err);
            });
        // initModels(db);
        fs
				.readdirSync(`${__dirname}/models/`)
				.filter((file) => (file.indexOf(".") !== 0)
					&& (file !== basename)
                    && (file !== "init-models.js")
					&& (file.slice(-3) === ".js"))
				.forEach((file) => {
					const model = db.import(path.join(`${__dirname}/models/`, file));
					db[model.name] = model;
				});

        Object.keys(db).forEach((modelName) => {
                if (db[modelName].associate) {
                    db[modelName].associate(db);
                }
            });
		return db;
	}
}

module.exports = {
    SequelizeClient,
    createData : (model, data)=> new Promise((resolve, reject) => {
            model.create(data)
                .then(result => resolve(result))
                .catch(err => {
                    err.error_code = CONSTANTS.SEQUELIZE_ERROR;
                    return reject(err);
                });
        }),
    updateData : (model, where, updatedData)=> new Promise((resolve, reject) => {
            model.update(updatedData, {
                where
            }).then(data => resolve(data))
                .catch(err => {
                    err.error_code = CONSTANTS.SEQUELIZE_ERROR;
                    return reject(err);
                });
        }),
    getDataList : (model, where, order, limit, offset)=> new Promise((resolve, reject) => {
            model.findAll({
                where,
                order,
                limit,
                offset
            }).then(result => resolve(result))
                .catch(err => {
                    err.error_code = CONSTANTS.SEQUELIZE_ERROR;
                    return reject(err);
                });
        }),
    getSingleRow : (model, where, order)=> new Promise((resolve, reject) => {
            model.findOne({
                where,
                order,
                raw: true
            }).then(data => resolve(data))
                .catch(err => {
                    err.error_code = CONSTANTS.SEQUELIZE_ERROR;
                    return reject(err);
                });
        }),
    deleteData : (model, where)=> new Promise((resolve, reject) => {
            model.destroy({where})
                .then(result => resolve(result))
                .catch(err => {
                    err.error_code = CONSTANTS.SEQUELIZE_ERROR;
                    return reject(err);
                });
        }),
    getDataCount : (model, where)=> new Promise((resolve, reject) => {
            model.count({
                where
            }).then(count => resolve(count))
                .catch(err => {
                    err.error_code = CONSTANTS.SEQUELIZE_ERROR;
                    return reject(err);
                });
        }),
    getDataBasedOnQuery : (model, queryData)=> new Promise((resolve, reject) => {
            model.query(queryData.query, {
                replacements: queryData.replacements,
                type: model.QueryTypes.SELECT
            }).then(data => resolve(data))
                .catch(err => {
                    err.error_code = CONSTANTS.SEQUELIZE_ERROR;
                    return reject(err);
                });
        }),
    createBulkData : (model, records, options)=> new Promise((resolve, reject) => {
            model.bulkCreate(records, options)
                .then(data => resolve(data))
                .catch(err => {
                    err.error_code = CONSTANTS.SEQUELIZE_ERROR;
                    return reject(err);
                });
        })
};