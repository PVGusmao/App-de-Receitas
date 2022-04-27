import React, { useContext } from 'react';
import Cards from '../components/Cards';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import UserContext from '../context/UserContext';

const LIMIT_CARDS = 12;

function Foods() {
  const {
    data,
    enableSearchBar,
  } = useContext(UserContext);

  return (
    <>
      <Header title="Foods" />
      {
        enableSearchBar && <SearchBar />
      }
      <section className="cards-wrapper">
        {
          Object.keys(data).length
            && data.meals.slice(0, LIMIT_CARDS).map((element, index) => (
              <Cards
                key={ element.idMeal }
                title={ element.strMeal }
                image={ element.strMealThumb }
                index={ index }
              />
            ))
        }
      </section>
    </>
  );
}

export default Foods;
