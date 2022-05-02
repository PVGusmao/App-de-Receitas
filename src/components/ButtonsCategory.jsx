import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

function ButtonsCategory() {
  const {
    category,
  } = useContext(UserContext);
  const iHateMagicNumber = 5;
  return (
    <section>
      {
        category.slice(0, iHateMagicNumber).map((element) => (
          <button
            data-testid={ `${element}-category-filter` }
            type="button"
            aria-label={ element }
            key={ element }
          >
            { element }
          </button>
        ))
      }
    </section>
  );
}

export default ButtonsCategory;
