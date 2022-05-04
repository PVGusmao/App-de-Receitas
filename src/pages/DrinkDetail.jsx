import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getByName, getDetailsRecipe } from '../services/api';
import Cards from '../components/Cards';

const iHateMagicNumber = 13;
const iHateMagicNumber3 = 6;

function DrinkDetail(props) {
  const history = useHistory();
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const { match: { params: { id } } } = props;
  const [meals, setMeals] = useState([]);
  const detailsRecipeDrinks = async (idDrink) => {
    const apiDetails = await getDetailsRecipe('drinks', idDrink);
    setDetailsRecipe(apiDetails.drinks[0]);
  };

  const handleHistory = () => {
    history.push(`/drinks/${id}/in-progress`);
  };

  const handleButtonText = () => {
    const drinks = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!Object.keys(drinks.cocktails).some((item) => item === id)) {
      return 'Start Recipe';
    }

    return 'Continue Recipe';
  };

  useEffect(() => {
    detailsRecipeDrinks(id);
    getByName('foods', '').then((meal) => setMeals(meal.meals));
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
      <div
        className="teste"
        style={ {
          display: 'flex',
          width: '100%',
          overflowX: 'auto',
        } }
      >
        {
          meals.slice(0, iHateMagicNumber3).map((food, index) => (
            <Cards
              id={ food.idMeal }
              key={ food.idMeal }
              title={ food.strMeal }
              image={ food.strMealThumb }
              index={ index }
              details
            />
          ))
        }
      </div>
      {
        JSON.parse(localStorage.getItem('doneRecipes')) === null
          ? (
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ handleHistory }
              style={ {
                position: 'fixed',
                bottom: '0px',
              } }
            >
              {
                JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
                && handleButtonText()
              }
            </button>
          ) : !JSON.parse(localStorage.getItem('doneRecipes'))
            .some((recipe) => recipe.id === id)
      && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleHistory }
          style={ {
            position: 'fixed',
            bottom: '0px',
          } }
        >
          {
            handleButtonText()
          }
        </button>
      )
      }
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
