const connection = require('../dbConnection');
const RecipeSchema = connection.getModels().RecipeSchema;
const { QueryTypes } = require('sequelize');

class RecipeController {
  constructor() {}

  async getRecipes() {
    try {
      let rs = await RecipeSchema.findAll({
        order: [['name', 'ASC']],
        raw: true,
      });
      return {
        status: 'ok',
        result: rs,
      };
    } catch (error) {
      console.log(error);
      return {
        error: 'Sorry something went wrong',
      };
    }
  }

  async saveRecipe(args) {
    try {
      const { name, price } = args;
      let recipe = await RecipeSchema.create({
        name: name.toString().trim().toLowerCase(),
        price: price,
      });
      return { status: 'ok', recipe: recipe };
    } catch (error) {
      console.log(error);
      return { status: 'failed', error: error };
    }
  }
  
  async updateRecipe(args) {
    try {
      const { name, price, id } = args;
      let recipe = await RecipeSchema.upsert({
        id: id,
        name: name.toString().trim().toLowerCase(),
        price: price,
      });
      return { status: 'ok', recipe: recipe };
    } catch (error) {
      console.log(error);
      return { status: 'failed', error: error };
    }
  }

  async isRecipeExists(args) {
    try {
      let name =
        typeof args.name != undefined && args.name.toString().trim().length > 0
          ? args.name.toString().trim()
          : null;
      let id = typeof args.id != undefined && args.id ? args.id : null;
      if (name) {
        let sequelize = connection.getMySqlConnection();
        let rs = null
        if (id) {
          rs = await sequelize.query(
            `select count(*) as total from Recipes where id <> ${id} and name='${name}' COLLATE NOCASE`,
            { type: QueryTypes.SELECT }
          );
        } else {
          rs = await sequelize.query(
            `select count(*) as total from Recipes where name='${name}' COLLATE NOCASE`,
            { type: QueryTypes.SELECT }
          );
        }
        return { count: rs[0].total };
      } else {
        return {
          error: 'Invalid arguments',
        };
      }
    } catch (error) {
      console.log('Error in RecipeController::isRecipeExists', error);
      return {
        error: 'Sorry something went wrong',
      };
    }
  }

  async removeRecipe(args) {
    try {
      let id = args.id;
      if (id) {
        await RecipeSchema.destroy({
          where: {
            id: id,
          },
        });
        return { status: 'ok' };
      } else {
        return { status: 'fail', msg: 'Invalid ID Record' };
      }
    } catch (error) {
      console.log('Error in RecipeController::removeRecipe', error);
      return {
        error: 'Sorry something went wrong',
      };
    }
  }
}

module.exports = new RecipeController();
