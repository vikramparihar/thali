const connection = require('./dbConnection');
connection.connect();
const UserController = require('./controller/UserController');
const RecipeController = require('./controller/RecipeController');
const OrderController  = require('./controller/OrderController')
// Reference
// https://wykrhm.medium.com/creating-standalone-desktop-applications-with-react-electron-and-sqlite3-269dbb310aee
class Database {
  constructor() {}
  /*
    Get user profile
  */
  async getProfile() {
    return 'Get profile from database';
  }
  /*
    Update User profile
  */
  async setProfile() {}

  /*
  Get all users
  */
  async getUsers() {
    return await UserController.getUsers();
  };

  async userRegister(args: any) {
    return await UserController.userRegister(args);
  }
 /*
    Check if user exists in database
  */
  async checkUserExists(args: any) {
    return await UserController.isUserExists(args);
  }


  async saveRecipe(args: any) {
    return await RecipeController.saveRecipe(args);
  }

  async updateRecipe(args: any) {
    return await RecipeController.updateRecipe(args);
  }

  async isRecipeExists(args: any) {
    return await RecipeController.isRecipeExists(args);
  }

  async getAllRecipe(args: any) {
    return await RecipeController.getRecipes(args);
  }

  async removeRecipe(args: any) {
    return await RecipeController.removeRecipe(args);
  }

  // Order apis call
  async saveOrder(args: any) {
    return await OrderController.saveOrder(args);
  }
  

  async updateOrder(args: any) {
    return await OrderController.updateOrder(args);
  }

  async getAllOrder(args: any) {
    return await OrderController.getOrders(args);
  }
}

module.exports = new Database();
