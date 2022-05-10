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

function Drinks(props) {
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
    if (state) {
      getIngredientFilter(path, state).then((element) => setIngredient(element));
    }
  }, []);

  const renderDrinks = filterCategory ? categoryData : ingredient ?? data;

  return (
    <>
      <Header title="Drinks" />
      {
        enableSearchBar && <SearchBar />
      }
      <ButtonsCategory />
      <section className="cards-wrapper">
        {
          Object.keys(renderDrinks).length > 0 && renderDrinks.drinks
              && renderDrinks.drinks.slice(0, LIMIT_CARDS).map((element, index) => (
                <Cards
                  id={ element.idDrink }
                  key={ element.idDrink }
                  title={ element.strDrink }
                  image={ element.strDrinkThumb }
                  index={ index }
                />
              ))
        }
      </section>
      <Footer />
    </>
  );
}

Drinks.propTypes = {
  location: PropTypes.instanceOf(PropTypes.string),
}.isRequired;

export default Drinks;
