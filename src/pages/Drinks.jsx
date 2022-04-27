import React, { useContext } from 'react';
import Cards from '../components/Cards';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import UserContext from '../context/UserContext';

const LIMIT_CARDS = 12;

function Drinks() {
  const {
    data,
    enableSearchBar,
  } = useContext(UserContext);
  return (
    <>
      <Header title="Drinks" />
      {
        enableSearchBar && <SearchBar />
      }
      <section className="cards-wrapper">
        {
          Object.keys(data).length && data.drinks
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
    </>
  );
}

export default Drinks;
