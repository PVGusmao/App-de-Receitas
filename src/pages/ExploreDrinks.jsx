import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomRecipe } from '../services/api';

function ExploreDrinks() {
  const history = useHistory();

  const handleClick = async ({ target }) => {
    if (target.id === 'surprise') {
      const randomData = await getRandomRecipe('drinks');
      history.push(`/drinks/${randomData.drinks[0].idDrink}`);
    } else {
      history.push(`/explore/drinks/${target.id}`);
    }
  };
  return (
    <>
      <Header title="Explore Drinks" />
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

export default ExploreDrinks;
