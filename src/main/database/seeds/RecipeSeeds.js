import { faker } from '@faker-js/faker';
const connection = require('../dbConnection');
const RecipeSchema = connection.getModels().RecipeSchema;
const { QueryTypes } = require('sequelize');

class RecipeSeeds {
  async invoke() {
    try {
      let seedData = [];
      let bunch = 20;
      for (let index = 0; index < bunch; index++) {
        let item = {
          name: faker.word.adjective(),
          price: parseInt(faker.random.numeric(3)),
        };
        seedData.push(item);
      }
    //   let recipes = seedData;
    //   console.log(seedData);
      let recipes = await RecipeSchema.bulkCreate(seedData);
      return { status: 'ok', msg: `${recipes.length} recipe added` };
    } catch (error) {
      return { status: 'fail', msg: error };
    }
  }
}

module.exports = new RecipeSeeds();
