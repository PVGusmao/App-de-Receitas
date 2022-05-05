import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getByName, getDetailsRecipe } from '../services/api';
import Cards from '../components/Cards';
import { getStorage } from '../services/storage';
import shareLink from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const INGREDIENT_SLICE = 13;
const LIMIT_CARDS = 6;
const MSG_TIMEOUT = 3000;

function DrinkDetail() {
  const history = useHistory();
  const { id } = useParams();
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const [shared, setShared] = useState(false);
  const [meals, setMeals] = useState([]);
  const detailsRecipeDrinks = async (idDrink) => {
    const apiDetails = await getDetailsRecipe('drinks', idDrink);
    setDetailsRecipe(apiDetails.drinks[0]);
  };

  const handleHistory = () => {
    history.push(`/drinks/${id}/in-progress`);
  };

  const handleButtonText = () => {
    const drinks = getStorage('inProgressRecipes');

    if (!Object.keys(drinks.cocktails).includes(id)) {
      return 'Start Recipe';
    }

    return 'Continue Recipe';
  };

  const handleShare = () => {
    copy(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), MSG_TIMEOUT);
  };

  useEffect(() => {
    detailsRecipeDrinks(id);
    getByName('foods', '').then((meal) => setMeals(meal.meals));
  }, []);

  const ingredients = Object.entries(detailsRecipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => `${value} - ${detailsRecipe[
      `strMeasure${key.slice(INGREDIENT_SLICE)}`]}`);

  return (
    <>
      <h1 data-testid="recipe-title">{detailsRecipe.strDrink }</h1>
      <img
        src={ detailsRecipe.strDrinkThumb }
        alt={ detailsRecipe.strDrink }
        data-testid="recipe-photo"
      />
      { shared && <p>Link copied!</p> }
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img src={ shareLink } alt="Share Icon" />
      </button>
      <button
        type="button"
      >
        { getStorage('favoriteRecipes').some((recipe) => recipe.id === id)
          ? (
            <img
              data-testid="favorite-btn"
              src={ blackHeartIcon }
              alt="Unfavorite recipe"
            />)
          : (
            <img
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              alt="Favorite recipe"
            />) }
      </button>
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
          meals.slice(0, LIMIT_CARDS).map((food, index) => (
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
        !getStorage('doneRecipes').some((recipe) => recipe.id === id)
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

export default DrinkDetail;
