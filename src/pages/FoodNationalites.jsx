import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getNationality, getNationalityFilter } from '../services/api';
import Cards from '../components/Cards';

function FoodNationalites() {
  const [nationality, setNationality] = useState([]);
  const [filteredNationality, setfilteredNationality] = useState([]);

  useEffect(() => {
    if (nationality.length === 0) {
      getNationality().then((element) => setNationality(element.meals));
    }
    // if (filteredNationality.length === 0) {
    //   getNationalityFilter('American')
    //     .then((element) => setfilteredNationality(element.meals));
    // }
  }, []);

  const handleChange = async ({ target }) => {
    const data = await getNationalityFilter(target.value);
    setfilteredNationality(data.meals);
  };

  return (
    <>
      <Header title="Explore Nationalities" />
      <select
        data-testid="explore-by-nationality-dropdown"
        className="country-list"
        onChange={ handleChange }
      >
        {
          nationality && nationality.map((element) => (
            <option
              data-testid={ `${element.strArea}-option` }
              value={ element.strArea }
              key={ element.strArea }
            >
              { element.strArea }
            </option>
          ))
        }
      </select>
      <section>
        {
          filteredNationality && filteredNationality.map((element, index) => (
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

export default FoodNationalites;
