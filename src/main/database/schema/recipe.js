const { DataTypes } = require('sequelize');

const getSchema = {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.NUMBER,
    notEmpty: true,
    defaultValue: 0,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

module.exports = getSchema;
