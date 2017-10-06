const supertest = require('supertest');
const app = require('../../../src/app');
const { findRecipe } = require('../../../src/recipes');

const request = supertest(app);

describe('POST /recipes/:id/likes', () => {
  describe('bump spesific recipe', () => {
    let recipe;
    beforeAll(() => {
      recipe = Object.assign({}, findRecipe(1));
      recipe.likes = 0; // explicitly set likes to be 0, just to make the test more readable.
    });

    test('first bump', () => { // eslint-disable-line arrow-body-style
      return request.post('/recipes/1/likes')
        .expect(({ status, body }) => {
          expect(status).toBe(200);
          expect(body.likes).toBe(recipe.likes + 1);
          expect(body.id).toBe(1);
          expect(body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            text: expect.any(String),
            image: expect.any(String),
            likes: expect.any(Number),
            comments: expect.any(Array),
          }));
        });
    });

    test('second bump', () => { // eslint-disable-line arrow-body-style
      return request.post('/recipes/1/likes')
        .expect(({ status, body }) => {
          expect(status).toBe(200);
          expect(body.likes).toBe(recipe.likes + 2);
          expect(body.id).toBe(1);
          expect(body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            text: expect.any(String),
            image: expect.any(String),
            likes: expect.any(Number),
            comments: expect.any(Array),
          }));
        });
    });
  });

  test('bump non-existing recipe', () => { // eslint-disable-line arrow-body-style
    return request.post('/recipes/0/likes')
      .expect(({ status }) => {
        expect(status).toBe(404);
      });
  });
});
