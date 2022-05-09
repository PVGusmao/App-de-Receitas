export async function getByIngredients(path, ingredient) {
  const url = path === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getByName(path, name) {
  const url = path === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getByFirstLetter(path, firstLetter) {
  const url = path === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getCategory(path) {
  const url = path === 'foods'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getCategoryFilter(path, category) {
  const url = path === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getDetailsRecipe(path, id) {
  const url = path === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getRandomRecipe(path) {
  const url = path === 'foods'
    ? 'https://www.themealdb.com/api/json/v1/1/random.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getIngredients(path) {
  const url = path === 'foods'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getIngredientFilter(path, Ingredient) {
  const url = path === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${Ingredient}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
