const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserData', {
    udId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bmi: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    bmiCategory: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    healthRisk: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'UserData',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "UserData_pkey",
        unique: true,
        fields: [
          { name: "udId" },
        ]
      },
    ]
  });
};
