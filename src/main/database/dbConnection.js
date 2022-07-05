import { app } from 'electron';
let Sequelize = require('sequelize');
let mySqlConnection = null;
let models = {};
const User = require('./schema/user');
const Recipe = require('./schema/recipe');
const Order = require('./schema/order');

exports.connect = function (host, port, dbName, userName, password) {
  return new Promise(async (reslove) => {
    let sequelize = new Sequelize(dbName, userName, password, {
      dialect: 'sqlite',
      storage: `${app.getPath('userData')}/thali/database.sql`,
    });
    // console.log(`${app.getPath('userData')}/thali/database.sql'`);
    models.UserSchema = sequelize.define('User', User, {paranoid: true });
    models.RecipeSchema = sequelize.define('Recipe', Recipe, {paranoid: true });
    models.OrderSchema = sequelize.define('Order', Order, {paranoid: true });
    sequelize
      .sync({alert: true})
      .then(function () {
        mySqlConnection = sequelize;
        reslove(true);
      })
      .catch(function (err) {
        console.log(
          'Error while connecting to Db: ' + JSON.stringify(err.message)
        );
        reslove(false);
      });
  });
};
exports.getModels = function () {
  return models;
};
exports.getMySqlConnection = function () {
  return mySqlConnection;
};
exports.MysqlColse = function () {
  return new Promise((reslove) => {
    let conn = mySqlConnection.close();
    if (conn) {
      reslove(true);
    } else {
      reslove(false);
    }
  });
};
