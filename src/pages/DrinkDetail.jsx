import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { getDetailsRecipe } from '../services/api';

function DrinkDetail(props) {
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const iHateMagicNumber = 13;
  const detailsRecipeDrinks = async (idDrink) => {
    const apiDetails = await getDetailsRecipe('drinks', idDrink);
    setDetailsRecipe(apiDetails.drinks[0]);
  };

  useEffect(() => {
    const { match: { params: { id } } } = props;
    detailsRecipeDrinks(id);
  }, []);

  const ingredients = Object.entries(detailsRecipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => `${value} - ${detailsRecipe[
      `strMeasure${key.slice(iHateMagicNumber)}`]}`);
  return (
    <>
      <h1 data-testid="recipe-title">{detailsRecipe.strDrink }</h1>
      <img
        src={ detailsRecipe.strDrinkThumb }
        alt={ detailsRecipe.strDrink }
        data-testid="recipe-photo"
      />
      <button type="button" data-testid="share-btn">compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{ detailsRecipe.strAlcoholic}</p>
      <ul>
        {
          ingredients.map((element, index) => (
            <li
              key={ element }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { element }
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">{ detailsRecipe.strInstructions }</p>
      <button type="button" data-testid="start-recipe-btn">Iniciar</button>
      <div data-testid={ `${0}-recomendation-card` }>{detailsRecipe.strTags}</div>
    </>
  );
}

DrinkDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetail;
