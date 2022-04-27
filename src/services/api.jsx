export async function getByIngredients(path, ingredient) {
  const url = path === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getByName(path, name) {
  console.log(path);
  const url = path === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getByFirstLetter(path, firstLetter) {
  console.log(path);
  const url = path === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
