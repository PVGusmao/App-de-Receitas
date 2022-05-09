import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import { getIngredients } from '../services/api';

const CARD_SHOW_LIMIT = 12;

function DrinkIngredients() {
  const [ingredient, setIngredient] = useState();

  useEffect(() => {
    getIngredients('drinks').then((element) => setIngredient(element.drinks));
  }, []);

  return (
    <>
      <Header title="Explore Ingredients" />
      {
        ingredient && ingredient.slice(0, CARD_SHOW_LIMIT)
          .map((element, index) => (
            <IngredientCard
              key={ index }
              index={ index }
              element={ element }
            />
          ))
      }
      <Footer />
    </>
  );
}

export default DrinkIngredients;
