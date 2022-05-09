import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cards from '../components/Cards';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import UserContext from '../context/UserContext';
import Footer from '../components/Footer';
import ButtonsCategory from '../components/ButtonsCategory';
import { getIngredientFilter } from '../services/api';

const LIMIT_CARDS = 12;

function Foods(props) {
  const [ingredient, setIngredient] = useState();

  const {
    data,
    path,
    categoryData,
    filterCategory,
    enableSearchBar,
    initialRequest,
    getStateCategory,
  } = useContext(UserContext);

  useEffect(() => {
    const { location: { state } } = props;
    getStateCategory();
    initialRequest();
    getIngredientFilter(path, state).then((element) => setIngredient(element));
  }, []);

  const renderFoods = filterCategory ? categoryData : ingredient ?? data;

  return (
    <>
      <Header title="Foods" />
      {
        enableSearchBar && <SearchBar />
      }
      <ButtonsCategory />
      <section className="cards-wrapper">
        {
          Object.keys(renderFoods).length > 0 && renderFoods.meals
            && renderFoods.meals.slice(0, LIMIT_CARDS).map((element, index) => (
              <Cards
                id={ element.idMeal }
                key={ element.idMeal }
                title={ element.strMeal }
                image={ element.strMealThumb }
                index={ index }
              />
            ))
        }
      </section>
      <Footer />
    </>
  );
}

Foods.propTypes = {
  location: PropTypes.instanceOf(PropTypes.string),
}.isRequired;

export default Foods;
