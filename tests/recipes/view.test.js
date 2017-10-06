const app = require('../../src/app');
const supertest = require('supertest');

const request = supertest(app);

/**
 * Since the total recipes is fixed to 21,
 * We can do explicit assertion
 */

describe('GET /recipes', () => {
  test('get recipes without any optional query string', () => { // eslint-disable-line arrow-body-style
    return request.get('/recipes')
      .expect(({ status, body }) => {
        expect(status).toBe(200);
        expect(body.limit).toBe(9);
        expect(body.result.length).toBe(9);
        expect(body.total).toBe(21);
        expect(body.page).toBe(1);
        expect(body.nextPage).toBe(2);
        expect(body.prevPage).toBe(null);

        const recipe = body.result[0];

        expect(recipe).toEqual(expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          text: expect.any(String),
          image: expect.any(String),
          likes: expect.any(Number),
          comments: expect.any(Array),
        }));
      });
  });

  describe('get recipes with `page` query string', () => { // eslint-disable-line arrow-body-style
    test('page = 2', () => { // eslint-disable-line arrow-body-style
      return request.get('/recipes?page=2')
        .expect(({ status, body }) => {
          expect(status).toBe(200);
          expect(body.limit).toBe(9);
          expect(body.result.length).toBe(9);
          expect(body.total).toBe(21);
          expect(body.page).toBe(2);
          expect(body.nextPage).toBe(3);
          expect(body.prevPage).toBe(1);
        });
    });

    test('page = 3', () => { // eslint-disable-line arrow-body-style
      return request.get('/recipes?page=3')
        .expect(({ status, body }) => {
          expect(status).toBe(200);
          expect(body.limit).toBe(9);
          expect(body.result.length).toBe(3);
          expect(body.total).toBe(21);
          expect(body.page).toBe(3);
          expect(body.nextPage).toBe(null);
          expect(body.prevPage).toBe(2);
        });
    });
  });


  describe('get recipes with `limit` query string', () => { // eslint-disable-line arrow-body-style
    test('limit = 7', () => { // eslint-disable-line arrow-body-style
      return request.get('/recipes?limit=7')
        .expect(({ status, body }) => {
          expect(status).toBe(200);
          expect(body.limit).toBe(7);
          expect(body.result.length).toBe(7);
          expect(body.total).toBe(21);
          expect(body.page).toBe(1);
          expect(body.nextPage).toBe(2);
          expect(body.prevPage).toBe(null);
        });
    });
  });

  describe('get recipes with `fields` query string', () => {
    test('fields = id,title', () => { // eslint-disable-line arrow-body-style
      return request.get('/recipes?fields=id,title')
        .expect(({ status, body }) => {
          expect(status).toBe(200);
          expect(body.limit).toBe(9);
          expect(body.result.length).toBe(9);
          expect(body.total).toBe(21);
          expect(body.page).toBe(1);
          expect(body.nextPage).toBe(2);
          expect(body.prevPage).toBe(null);

          const recipe = body.result[0];

          expect(recipe).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
          }));
          expect(recipe).not.toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            text: expect.any(String),
            image: expect.any(String),
            likes: expect.any(Number),
            comments: expect.any(Array),
          }));
        });
    });

    test('fields = id,title,text', () => { // eslint-disable-line arrow-body-style
      return request.get('/recipes?fields=id,title,text')
        .expect(({ status, body }) => {
          expect(status).toBe(200);
          expect(body.limit).toBe(9);
          expect(body.result.length).toBe(9);
          expect(body.total).toBe(21);
          expect(body.page).toBe(1);
          expect(body.nextPage).toBe(2);
          expect(body.prevPage).toBe(null);

          const recipe = body.result[0];

          expect(recipe).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            text: expect.any(String),
          }));
          expect(recipe).not.toEqual(expect.objectContaining({
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
});
