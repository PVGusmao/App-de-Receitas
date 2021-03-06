import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getDetailsRecipe, getByName } from '../services/api';
import Cards from '../components/Cards';
import { getStorage, setStorage } from '../services/storage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

/* button.addEventListener('click', function () {
  copy('This is some cool text')
}) */

const INGREDIENT_SLICE = 13;
const YOUTUBE_SLICE = 32;
const LIMIT_CARDS = 6;
const MSG_TIMEOUT = 3000;

function FoodDetail() {
  const history = useHistory();
  const { id } = useParams();
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const [changeFavorite, setChangefavorite] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [shared, setShared] = useState(false);
  const detailsRecipeFoods = async (idFood) => {
    const apiDetails = await getDetailsRecipe('foods', idFood);
    setDetailsRecipe(apiDetails.meals[0]);
  };

  const handleHistory = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  const handleButtonText = () => {
    const meals = getStorage('inProgressRecipes');

    if (!Object.keys(meals.meals).includes(id)) {
      return 'Start Recipe';
    }

    return 'Continue Recipe';
  };

  const handleShare = () => {
    copy(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), MSG_TIMEOUT);
  };

  const handleFavorite = () => {
    if (getStorage('favoriteRecipes').some((recipe) => recipe.id === id)) {
      setStorage('favoriteRecipes', getStorage('favoriteRecipes')
        .filter((element) => element.id !== id));
      setChangefavorite(false);
    } else {
      const obj = {
        id,
        type: 'food',
        nationality: !detailsRecipe.strArea ? '' : detailsRecipe.strArea,
        category: detailsRecipe.strCategory,
        alcoholicOrNot: !detailsRecipe.strAlcoholic ? '' : detailsRecipe.strAlcoholic,
        name: detailsRecipe.strMeal,
        image: detailsRecipe.strMealThumb,
      };

      setStorage('favoriteRecipes', [...getStorage('favoriteRecipes'), obj]);
      setChangefavorite(true);
    }
  };

  useEffect(() => {
    detailsRecipeFoods(id);
    getByName('drinks', '').then((element) => setDrinks(element.drinks));
    setChangefavorite(getStorage('favoriteRecipes').some((recipe) => recipe.id === id));
  }, []);

  const ingredients = Object.entries(detailsRecipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => `${value} - ${detailsRecipe[
      `strMeasure${key.slice(INGREDIENT_SLICE)}`]}`);

  return (
    <>
      <h1 data-testid="recipe-title">{ detailsRecipe.strMeal }</h1>
      <img
        src={ detailsRecipe.strMealThumb }
        alt={ detailsRecipe.strMeal }
        data-testid="recipe-photo"
      />

      { shared && <p>Link copied!</p> }

      <button type="button" data-testid="share-btn" onClick={ handleShare }>
        <img src={ shareIcon } alt="Share recipe" />
      </button>
      <button type="button" onClick={ handleFavorite }>
        { changeFavorite
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
      <iframe width="560" height="315" src={ `https://www.youtube.com/embed/${detailsRecipe?.strYoutube?.slice?.(YOUTUBE_SLICE)}` } title="YouTube video player" frameBorder="0" allow="clipboard-write; encrypted-media; picture-in-picture" allowFullScreen data-testid="video" />
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
          drinks.slice(0, LIMIT_CARDS).map((drink, index) => (
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

export default FoodDetail;
