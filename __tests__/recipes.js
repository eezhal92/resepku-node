const {
  addComment,
  findRecipe,
  bumpRecipeLike,
  fieldsResolver,
  paginateRecipes,
} = require('../recipes');

describe('addComment', () => {
  test('it adds comment when recipe is found', () => {
    const id = 1;
    const recipe = findRecipe(id);
    const len = recipe.comments.length;
    const comment = 'Adding this comment';

    const updated = addComment(1, comment);

    expect(updated.comments.length).not.toEqual(len);
    expect(updated.comments.pop()).toEqual(comment);
  });

  test('it throws error when recipe not found', () => {
    expect(() => addComment(0, 'muahaha, this will error.')).toThrow();
  });
});

describe('findRecipe', () => {
  test('it can find by id', () => {
    const recipe = findRecipe(1);

    expect(recipe.id).toBe(1);
  });

  test('it throws error when recipe not found', () => {
    expect(() => findRecipe(0)).toThrow();
  });
});

describe('bumpRecipeLike', () => {
  test('it increments recipe count, if found', () => {
    const id = 1;
    const recipe = findRecipe(id);
    const likes = recipe.likes;

    const updated = bumpRecipeLike(1);

    expect(updated.likes).not.toEqual(likes);
    expect(updated.likes - 1).toEqual(likes);
  });

  test('it throws error, if not found', () => {
    expect(() => bumpRecipeLike(0)).toThrow();
  });
});

describe('fieldsResolver()', () => {
  let recipe;
  beforeEach(() => {
    recipe = findRecipe(1);
  });

  test('if fields is falsy, return recipe', () => {
    [null, undefined, false, ''].forEach(fields => {
      expect(fieldsResolver(recipe, fields)).toEqual(recipe);
    });
  });

  test('it throws error if fields has 0 length', () => {
    expect(() => fieldsResolver(recipe, [])).toThrow();
  });

  test('it throws error if invalid fields', () => {
    expect(() => fieldsResolver(recipe, ['do-not-exist'])).toThrow();
  });

  test('it returns a single resolvable field', () => {
    const result = fieldsResolver(recipe, ['likes']);

    expect(result).toEqual(
      expect.objectContaining({
        likes: expect.any(Number),
      })
    );
  });

  test('it returns multiple resolvable fields', () => {
    const result = fieldsResolver(recipe, [
      'id',
      'title',
      'text',
      'image',
      'likes',
      'comments',
    ]);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        text: expect.any(String),
        image: expect.any(String),
        likes: expect.any(Number),
        comments: expect.any(Array),
      })
    );
  });
});

describe('paginateRecipes', () => {
  test('it returns 0 recipes if limit is 0', () => {
    const recipes = paginateRecipes({ limit: 0 });

    expect(recipes.result).toHaveLength(0);
  });

  describe('getting page number', () => {
    test('it sets first page correctly', () => {
      const recipes = paginateRecipes({ page: 1, limit: 10 });

      expect(recipes.page).toEqual(1);
      expect(recipes.prevPage).toEqual(null);
      expect(recipes.nextPage).toEqual(2);
    });

    test('it sets other pages appropriately', () => {
      const chunk = 10;
      let pages = {};
      let currentPage = 1;

      while (true) {
        const recipes = paginateRecipes({ page: currentPage, limit: chunk });
        if (!recipes.result.length) {
          break;
        }

        pages[recipes.page] = recipes;
        currentPage += 1;
      }

      const pageNumbers = Object.keys(pages);

      expect(pageNumbers).toEqual(['1', '2', '3']);
      pageNumbers.forEach(num => {
        const page = pages[num];
        expect(page.result.length).toBeGreaterThan(0);
      });
    });

    test('it can return a subset of fields', () => {
      const recipes = paginateRecipes({ page: 1, limit: 10, fields: ['id'] });

      recipes.result.forEach(recipe => {
        expect(Object.keys(recipe)).toEqual(['id']);
      });
    });
  });
});
