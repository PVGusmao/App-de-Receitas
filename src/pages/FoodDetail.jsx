import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getDetailsRecipe, getByName } from '../services/api';
import Cards from '../components/Cards';
import { getStorage } from '../services/storage';

const INGREDIENT_SLICE = 13;
const YOUTUBE_SLICE = 32;
const LIMIT_CARDS = 6;

function FoodDetail() {
  const history = useHistory();
  const { id } = useParams();
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const [drinks, setDrinks] = useState([]);
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

  useEffect(() => {
    detailsRecipeFoods(id);
    getByName('drinks', '').then((element) => setDrinks(element.drinks));
  }, []);

  const ingredients = Object.entries(detailsRecipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => `${value} - ${detailsRecipe[
      `strMeasure${key.slice(INGREDIENT_SLICE)}`]}`);

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
