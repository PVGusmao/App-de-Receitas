import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import UserContext from '../context/UserContext';

function ButtonsCategory() {
  const match = useRouteMatch();
  const {
    category,
    categoryFilterFood,
    categoryFilterDrink,
    filterCategory,
    setFilterCategory,
  } = useContext(UserContext);
  const iHateMagicNumber = 5;

  const categoryFoodAndDrink = ({ target }) => {
    const path = match.path.split('/')[1];
    if (filterCategory === target.value || target.value === '') setFilterCategory('');
    else if (path === 'foods') categoryFilterFood(target.value);
    else categoryFilterDrink(target.value);
  };

  return (
    <section>
      {
        category.slice(0, iHateMagicNumber).map((element) => (
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
