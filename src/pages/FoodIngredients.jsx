import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getIngredients } from '../services/api';
import IngredientCard from '../components/IngredientCard';

const CARD_SHOW_LIMIT = 12;

function FoodIngredients() {
  const [ingredient, setIngredient] = useState();

  useEffect(() => {
    getIngredients('foods').then((element) => setIngredient(element.meals));
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

export default FoodIngredients;
