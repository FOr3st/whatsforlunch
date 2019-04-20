import {
  filterEdibleIngrediends,
  filterRecipesByIngredients,
  freshnessCompareFunction,
  getAvailableIngredients,
  recipeCanBePrepared,
  filterNotFreshIngrediends
} from "./cooking";

const bestBeforeDate = new Date(2019, 2, 1);
const useByDate = new Date(2019, 5, 1);

function getRecipes() {
  return {
    hamburger: {
      title: "Hamburger",
      ingredients: ["Bun", "Ham"]
    },
    cheeseburger: {
      title: "Cheeseburger",
      ingredients: ["Bun", "Cheese", "Ham"]
    },
    greekSalad: {
      title: "Greek Salad",
      ingredients: ["Cheese", "Ham", "Salad"]
    }
  };
}

function getIngredients() {
  return {
    bun: {
      title: "Bun",
      bestBefore: bestBeforeDate,
      useBy: useByDate
    },
    ham: {
      title: "Ham",
      bestBefore: bestBeforeDate,
      useBy: useByDate
    },
    cheese: {
      title: "Cheese",
      bestBefore: bestBeforeDate,
      useBy: useByDate
    },
    salad: {
      title: "Salad",
      bestBefore: bestBeforeDate,
      useBy: useByDate
    }
  };
}

describe("Cooking", () => {
  test("filtering edible ingredients before expiration", () => {
    const { cheese, ham, bun, salad } = getIngredients();

    const result = filterEdibleIngrediends(
      [cheese, ham, bun, salad],
      new Date(2019, 1, 1)
    );

    expect(result).toEqual([
      {
        title: "Cheese",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      },
      {
        title: "Ham",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      },
      { title: "Bun", bestBefore: bestBeforeDate, useBy: useByDate },
      {
        title: "Salad",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      }
    ]);
  });

  test("filtering edible ingredients with partially expired", () => {
    const { cheese, ham, bun, salad } = getIngredients();
    const expiredHam = { ...ham, useBy: new Date(2015, 1, 1) };

    const result = filterEdibleIngrediends(
      [cheese, bun, salad, expiredHam],
      new Date(2019, 1, 1)
    );

    expect(result).toEqual([
      {
        title: "Cheese",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      },
      { title: "Bun", bestBefore: bestBeforeDate, useBy: useByDate },
      {
        title: "Salad",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      }
    ]);
  });

  test("filtering edible ingredients after expiration", () => {
    const { cheese, ham, bun, salad } = getIngredients();

    const result = filterEdibleIngrediends(
      [cheese, ham, bun, salad],
      new Date(2019, 6, 1)
    );

    expect(result).toHaveLength(0);
  });

  test("filtering not fresh products with all fresh ingredients", () => {
    const { cheese, ham, bun } = getIngredients();

    const result = filterNotFreshIngrediends(
      [cheese, ham, bun],
      new Date(2019, 1, 1)
    );

    expect(result).toHaveLength(0);
  });

  test("filtering not fresh products with partially fresh ingredients", () => {
    const { cheese, ham, bun } = getIngredients();
    const bestBeforePassedDate = new Date(2018, 11, 1);
    const notFreshCheese = { ...cheese, bestBefore: bestBeforePassedDate };

    const result = filterNotFreshIngrediends(
      [notFreshCheese, ham, bun],
      new Date(2019, 1, 1)
    );

    expect(result).toEqual([
      {
        title: "Cheese",
        bestBefore: bestBeforePassedDate,
        useBy: useByDate
      }
    ]);
  });

  test("filtering not fresh products with all not fresh ingredients", () => {
    const { cheese, ham, bun } = getIngredients();

    const result = filterNotFreshIngrediends(
      [cheese, ham, bun],
      new Date(2019, 3, 1)
    );

    expect(result).toEqual([
      {
        title: "Cheese",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      },
      {
        title: "Ham",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      },
      { title: "Bun", bestBefore: bestBeforeDate, useBy: useByDate }
    ]);
  });

  test("checking recipes by ingredients filtering", () => {
    const { ham, bun } = getIngredients();
    const { greekSalad, hamburger, cheeseburger } = getRecipes();

    const result = filterRecipesByIngredients(
      [greekSalad, hamburger, cheeseburger],
      [ham, bun]
    );

    expect(result).toEqual([
      {
        title: "Hamburger",
        ingredients: ["Bun", "Ham"]
      }
    ]);
  });

  test("checking recipes by ingredients filtering with not enough ingredients", () => {
    const { bun, salad } = getIngredients();
    const { greekSalad, hamburger, cheeseburger } = getRecipes();

    const result = filterRecipesByIngredients(
      [greekSalad, hamburger, cheeseburger],
      [bun, salad]
    );

    expect(result).toHaveLength(0);
  });

  test("checking recipes by ingredients filtering with no ingredients", () => {
    const { greekSalad, hamburger, cheeseburger } = getRecipes();

    const result = filterRecipesByIngredients(
      [greekSalad, hamburger, cheeseburger],
      []
    );

    expect(result).toHaveLength(0);
  });

  test("checking if recipe could be cooked with all available ingredients", () => {
    const { ham, bun } = getIngredients();
    const { hamburger } = getRecipes();

    const result = recipeCanBePrepared(hamburger, [ham, bun]);

    expect(result).toBe(true);
  });

  test("checking if recipe could be cooked with all available ingredients and more", () => {
    const { ham, bun, salad, cheese } = getIngredients();
    const { hamburger } = getRecipes();

    const result = recipeCanBePrepared(hamburger, [ham, bun, salad, cheese]);

    expect(result).toBe(true);
  });

  test("checking if recipe could be cooked with missing ingredients", () => {
    const { ham, bun, salad } = getIngredients();
    const { cheeseburger } = getRecipes();

    const result = recipeCanBePrepared(cheeseburger, [ham, bun, salad]);
    expect(result).toBe(false);
  });

  test("checking available ingredients for particular recipe with all available", () => {
    const { cheese, ham, bun, salad } = getIngredients();
    const { greekSalad } = getRecipes();

    const result = getAvailableIngredients(greekSalad, [
      cheese,
      ham,
      bun,
      salad
    ]);

    expect(result).toEqual([
      {
        title: "Cheese",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      },
      {
        title: "Ham",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      },
      {
        title: "Salad",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      }
    ]);
  });

  test("checking available ingredients for particular recipe with one missing", () => {
    const { cheese, ham, bun } = getIngredients();
    const { greekSalad } = getRecipes();

    const result = getAvailableIngredients(greekSalad, [cheese, ham, bun]);

    expect(result).toEqual([
      {
        title: "Cheese",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      },
      {
        title: "Ham",
        bestBefore: bestBeforeDate,
        useBy: useByDate
      }
    ]);
  });

  test("checking freshness compare function", () => {
    const { cheeseburger, hamburger, greekSalad } = getRecipes();
    const recipes = [greekSalad, cheeseburger, hamburger];
    const { cheese, ham, bun, salad } = getIngredients();
    const notFreshCheese = { ...cheese, bestBefore: new Date(1, 12, 2018) };
    const notFreshSalad = { ...salad, bestBefore: new Date(1, 12, 2018) };

    const compareFunction = freshnessCompareFunction(
      [ham, bun, notFreshCheese, notFreshSalad],
      new Date(2019, 1, 1)
    );
    const result = recipes.sort(compareFunction);
    expect(result).toEqual([
      {
        title: "Hamburger",
        ingredients: ["Bun", "Ham"]
      },
      {
        title: "Cheeseburger",
        ingredients: ["Bun", "Cheese", "Ham"]
      },
      {
        title: "Greek Salad",
        ingredients: ["Cheese", "Ham", "Salad"]
      }
    ]);
  });
});
