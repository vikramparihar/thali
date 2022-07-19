import { faker } from '@faker-js/faker';
const RecipeSchema = connection.getModels().RecipeSchema;
const { QueryTypes } = require('sequelize');

class RecipeSeeds {
    async invoke() {

    }
}

module.exports = new RecipeSeeds()