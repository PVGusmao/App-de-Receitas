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
    enableSearchBar,
    initialRequestDrink,
    getStateCategoryDrinks,
  } = useContext(UserContext);

  useEffect(() => {
    getStateCategoryDrinks();
    initialRequestDrink();
  }, [initialRequestDrink]);
  return (
    <>
      <Header title="Drinks" />
      {
        enableSearchBar && <SearchBar />
      }
      <ButtonsCategory />
      <section className="cards-wrapper">
        {
          Object.keys(data).length > 0 && data.drinks
            && data.drinks.slice(0, LIMIT_CARDS).map((element, index) => (
              <Cards
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
