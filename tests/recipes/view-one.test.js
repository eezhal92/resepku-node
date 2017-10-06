const app = require('../../src/app');
const supertest = require('supertest');

const request = supertest(app);

describe('GET /recipes', () => {
  test('get spesific recipe without any optional query string', () => { // eslint-disable-line arrow-body-style
    return request.get('/recipes/1')
      .expect(({ status, body }) => {
        expect(status).toBe(200);
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

  test('get spesific recipe with `fields` query string', () => { // eslint-disable-line arrow-body-style
    return request.get('/recipes/1?fields=id,title')
      .expect(({ status, body }) => {
        expect(status).toBe(200);
        expect(body.id).toBe(1);
        expect(body).toEqual(expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
        }));
        expect(body).not.toEqual(expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          text: expect.any(String),
          image: expect.any(String),
          likes: expect.any(Number),
          comments: expect.any(Array),
        }));
      });
  });

  test('get non-existing recipe', () => { // eslint-disable-line arrow-body-style
    return request.get('/recipes/0')
      .expect(({ status }) => {
        expect(status).toBe(404);
      });
  });
});
