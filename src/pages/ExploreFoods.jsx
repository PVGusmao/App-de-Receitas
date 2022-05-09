import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomRecipe } from '../services/api';

function ExploreFoods() {
  const history = useHistory();

  const handleClick = async ({ target }) => {
    if (target.id === 'surprise') {
      const randomData = await getRandomRecipe('foods');
      console.log(randomData);
      history.push(`/foods/${randomData.meals[0].idMeal}`);
    } else {
      history.push(`/explore/foods/${target.id}`);
    }
  };

  return (
    <>
      <Header title="Explore Foods" />
      <button
        onClick={ handleClick }
        id="ingredients"
        data-testid="explore-by-ingredient"
        type="button"
      >
        By Ingredient
      </button>
      <button
        onClick={ handleClick }
        id="nationalities"
        data-testid="explore-by-nationality"
        type="button"
      >
        By Nationality
      </button>
      <button
        onClick={ handleClick }
        id="surprise"
        data-testid="explore-surprise"
        type="button"
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}

export default ExploreFoods;
