var DataTypes = require("sequelize").DataTypes;
var _UserData = require("./UserData");

function initModels(sequelize) {
  var UserData = _UserData(sequelize, DataTypes);


  return {
    UserData,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
