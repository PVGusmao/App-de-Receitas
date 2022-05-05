import React, { useContext, useEffect } from 'react';
import Cards from '../components/Cards';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import UserContext from '../context/UserContext';
import Footer from '../components/Footer';
import ButtonsCategory from '../components/ButtonsCategory';

const LIMIT_CARDS = 12;

function Drinks() {
  const {
    data,
    categoryData,
    filterCategory,
    enableSearchBar,
    initialRequest,
    getStateCategory,
  } = useContext(UserContext);

  useEffect(() => {
    getStateCategory();
    initialRequest();
  }, []);

  const renderDrinks = filterCategory ? categoryData : data;

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

export default Drinks;
