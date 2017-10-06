const supertest = require('supertest');
const app = require('../../../src/app');
const { findRecipe } = require('../../../src/recipes');

const request = supertest(app);

describe('POST /recipes/:id/comments', () => {
  test('comment text should at least 4 character', () => {
    const payload = { text: 'Hel' };

    return request.post('/recipes/1/comments')
      .send(payload)
      .expect(({ status }) => {
        expect(status).toBe(422);
        const recipe = findRecipe(1);

        expect(recipe.comments.length).toBe(0);
      });
  });

  test('should return status 422 if no text is sent', () => {
    const payload = {};

    return request.post('/recipes/1/comments')
        .send(payload)
        .expect(({ status }) => {
          expect(status).toBe(422);
          const recipe = findRecipe(1);

          expect(recipe.comments.length).toBe(0);
        });
  });


  describe('add valid comment to spesific recipe', () => {
    test('first add', () => {
      const payload = { text: 'Hello There!' };

      return request.post('/recipes/1/comments')
        .send(payload)
        .expect(({ status, body }) => {
          expect(status).toBe(200);
          expect(body.comments.length).toBe(1);
          expect(body.comments).toContain('Hello There!');
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

    test('second add', () => {
      const payload = { text: 'Whatcha doin?' };

      return request.post('/recipes/1/comments')
        .send(payload)
        .expect(({ status, body }) => {
          expect(status).toBe(200);
          expect(body.comments.length).toBe(2);
          expect(body.comments).toContain('Whatcha doin?');
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

  test('add comment to non-existing recipe', () => { // eslint-disable-line arrow-body-style
    return request.post('/recipes/0/comment')
      .expect(({ status }) => {
        expect(status).toBe(404);
      });
  });
});
