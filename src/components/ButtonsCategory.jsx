import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import '../assets/buttonsCategory.css';

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
    <section className="btn-category-wrapper">
      {
        categoryList.slice(0, CATEGORY_LIMIT).map((element) => (
          <button
            onClick={ categoryFoodAndDrink }
            className="btn-category"
            value={ element }
            data-testid={ `${element}-category-filter` }
            type="button"
            aria-label={ element }
            key={ element }
          >
            {element === 'Other/Unknown' ? 'Other' : element}
          </button>
        ))
      }
      <button
        data-testid="All-category-filter"
        className="btn-category"
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
