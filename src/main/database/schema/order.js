const { DataTypes } = require('sequelize');

const getSchema = {
  // Model attributes are defined here
  tableNumber: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  customerName : {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  items: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

module.exports = getSchema;
