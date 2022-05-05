const INITIAL_STATES = {
  mealsToken: 0,
  cocktailsToken: 0,
  user: { email: '' },
  doneRecipes: [],
  favoriteRecipes: [],
  inProgressRecipes: { cocktails: [], meals: [] },
};

const isObject = (elem) => typeof elem === 'object' && elem !== null;

export function setStorage(key, value) {
  if (isObject(value)) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
}

export function getStorage(key) {
  if (localStorage.getItem(key) === null) setStorage(key, INITIAL_STATES[key]);

  if (isObject(INITIAL_STATES[key])) {
    return JSON.parse(localStorage.getItem(key));
  }
  return localStorage.getItem(key);
}
