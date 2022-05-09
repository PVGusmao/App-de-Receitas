import React, { useState } from 'react';
import HorizontalCard from '../components/HorizontalCard';
import Header from '../components/Header';
import { getStorage } from '../services/storage';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const [recipes, setRecipes] = useState(getStorage('favoriteRecipes'));

  const updateRecipes = () => setRecipes(getStorage('favoriteRecipes'));

  const handleFilter = ({ target }) => setFilter(target.value);

  return (
    <>
      <Header title="Favorite Recipes" />

      <main>
        <section>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            value=""
            onClick={ handleFilter }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            value="food"
            onClick={ handleFilter }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            value="drink"
            onClick={ handleFilter }
          >
            Drinks
          </button>
        </section>
        <section>
          { recipes.filter((elem) => elem.type.startsWith(filter))
            .map((elem, index) => (
              <HorizontalCard
                key={ elem.id }
                index={ index }
                recipe={ elem }
                updateRecipes={ updateRecipes }
                favorite
              />
            )) }
        </section>
      </main>
    </>
  );
}

export default FavoriteRecipes;
