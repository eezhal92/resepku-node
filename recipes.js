const faker = require('faker');
const intersection = require('lodash/intersection');

const recipesCount = 21;
const recipes = Array.from({ length: recipesCount }, (val, i) => ({
  id: i + 1,
  title: faker.name.findName(),
  text: faker.lorem.paragraphs(),
  image: faker.image.food(),
  likes: 0,
  comments: [],
}));

function paginateRecipes({ page = 1, limit = 9, fields = null } = {}) {
  const begin = (page * limit) - limit;
  const end = begin + limit;
  const total = recipes.length;
  const result = recipes.slice(begin, end);
  const hasNextResult = recipes.slice(end, end + 1).length;
  const nextPage = hasNextResult ? page + 1 : null;
  const prevPage = page - 1 === 0 ? null : page - 1;

  return {
    page,
    limit,
    total,
    result: result.map(recipe => fieldsResolver(recipe, fields)),
    nextPage,
    prevPage,
  };
};

function findRecipe(id) {
  const foundRecipe = recipes.find(recipe => recipe.id === id);

  if (!foundRecipe) {
    throw new Error('Recipe was not found');
  }

  return foundRecipe;
}

function bumpRecipeLikes(id) {
  const recipe = findRecipe(id);

  recipe.likes += 1;

  return recipe;
}

function addComment(id, commentText) {
  const recipe = findRecipe(id);

  recipe.comments.push(commentText);

  return recipe;
}

function fieldsResolver(recipe, fields = null) {
  if (!fields) {
    return recipe;
  }

  const availableFields = Object.keys(recipe);
  const validRequestedFields = intersection(availableFields, fields);

  if (!validRequestedFields.length) {
    throw new Error(`Please provide valid fields. Available fields: ${availableFields.join(', ')}`);
  }

  return validRequestedFields
    .map(field => ({ [field]: recipe[field] }))
    .reduce((acc, field) => Object.assign(acc, field), {});
}

module.exports = {
  addComment,
  findRecipe,
  bumpRecipeLikes,
  fieldsResolver,
  paginateRecipes,
};
