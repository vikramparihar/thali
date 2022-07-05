const { DataTypes } = require('sequelize');

const getSchema = {
  // Model attributes are defined here
  userName: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING(64),
    notEmpty: true,
    // allowNull defaults to true
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

module.exports = getSchema;
