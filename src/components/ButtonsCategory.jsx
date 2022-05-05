import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const CATEGORY_LIMIT = 5;

function ButtonsCategory() {
  const {
    categoryList,
    filterByCategory,
    filterCategory,
    setFilterCategory,
  } = useContext(UserContext);

  const categoryFoodAndDrink = ({ target }) => {
    if (filterCategory === target.value || target.value === '') setFilterCategory('');
    else filterByCategory(target.value);
  };

  return (
    <section>
      {
        categoryList.slice(0, CATEGORY_LIMIT).map((element) => (
          <button
            onClick={ categoryFoodAndDrink }
            value={ element }
            data-testid={ `${element}-category-filter` }
            type="button"
            aria-label={ element }
            key={ element }
          >
            {element}
          </button>
        ))
      }
      <button
        data-testid="All-category-filter"
        type="button"
        aria-label="buttonALL"
        value=""
        onClick={ categoryFoodAndDrink }
      >
        All
      </button>
    </section>
  );
}

export default ButtonsCategory;
