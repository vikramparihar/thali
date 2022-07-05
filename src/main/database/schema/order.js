const { DataTypes } = require('sequelize');

const getSchema = {
  // Model attributes are defined here
  items: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

module.exports = getSchema;
