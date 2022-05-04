import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { getDetailsRecipe, getByName } from '../services/api';
import Cards from '../components/Cards';

const iHateMagicNumber = 13;
const iHateMagicNumber2 = 32;
const iHateMagicNumber3 = 6;

function FoodDetail(props) {
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const [drinks, setDrinks] = useState([]);
  const detailsRecipeFoods = async (idFood) => {
    const apiDetails = await getDetailsRecipe('foods', idFood);
    setDetailsRecipe(apiDetails.meals[0]);
  };

  useEffect(() => {
    const { match: { params: { id } } } = props;
    detailsRecipeFoods(id);
    getByName('drinks', '').then((element) => setDrinks(element.drinks));
  }, []);

  const ingredients = Object.entries(detailsRecipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => `${value} - ${detailsRecipe[
      `strMeasure${key.slice(iHateMagicNumber)}`]}`);
  return (
    <>
      <h1 data-testid="recipe-title">{detailsRecipe.strMeal }</h1>
      <img
        src={ detailsRecipe.strMealThumb }
        alt={ detailsRecipe.strMeal }
        data-testid="recipe-photo"
      />
      <button type="button" data-testid="share-btn">compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{ detailsRecipe.strCategory}</p>
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
      <iframe width="560" height="315" src={ `https://www.youtube.com/embed/${detailsRecipe?.strYoutube?.slice?.(iHateMagicNumber2)}` } title="YouTube video player" frameBorder="0" allow="clipboard-write; encrypted-media; picture-in-picture" allowFullScreen data-testid="video" />
      <p data-testid="instructions">{ detailsRecipe.strInstructions }</p>
      <div
        className="teste"
        style={ {
          display: 'flex',
          width: '100%',
          overflowX: 'auto',
        } }
      >
        {
          drinks.slice(0, iHateMagicNumber3).map((drink, index) => (
            <Cards
              id={ drink.idDrink }
              key={ drink.idDrink }
              title={ drink.strDrink }
              image={ drink.strDrinkThumb }
              index={ index }
              details
            />
          ))
        }
      </div>
      <button type="button" data-testid="start-recipe-btn">Iniciar</button>
    </>
  );
}

FoodDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetail;
