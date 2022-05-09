import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function IngredientCard(props) {
  const { index, element } = props;
  const { path } = useContext(UserContext);

  return (
    <Link
      to={ {
        pathname: `/${path}/`,
        state: path === 'foods' ? element.strIngredient : element.strIngredient1,
      } }
    >
      <section
        data-testid={ `${index}-ingredient-card` }
        className="ingredient-card-wrapper "
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.the${path === 'foods' ? 'meal' : 'cocktail'}db.com/images/ingredients/${path === 'foods' ? element.strIngredient : element.strIngredient1}-Small.png` }
          alt={ path === 'foods' ? element.strIngredient : element.strIngredient1 }
        />
        <h2
          data-testid={ `${index}-card-name` }
        >
          { path === 'foods' ? element.strIngredient : element.strIngredient1 }
        </h2>
      </section>
    </Link>
  );
}

IngredientCard.propTypes = {
  element: PropTypes.instanceOf(PropTypes.object),
  index: PropTypes.number,
}.isRequired;

export default IngredientCard;
