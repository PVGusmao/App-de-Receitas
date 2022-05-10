import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getNationality, getNationalityFilter, getByName } from '../services/api';
import Cards from '../components/Cards';

const DOZE = 12;

function FoodNationalites() {
  const [nationality, setNationality] = useState([]);
  const [filteredNationality, setfilteredNationality] = useState([]);

  useEffect(() => {
    if (nationality.length === 0) {
      getNationality().then((element) => setNationality(element.meals));
    }
    getByName('foods', '')
      .then((element) => setfilteredNationality(element.meals));
  }, []);

  const handleChange = async ({ target }) => {
    if (target.value === 'all') {
      const data = await getByName('foods', '');
      setfilteredNationality(data.meals);
    } else {
      const data = await getNationalityFilter(target.value);
      setfilteredNationality(data.meals);
    }
  };

  return (
    <>
      <Header title="Explore Nationalities" />
      <select
        data-testid="explore-by-nationality-dropdown"
        className="country-list"
        onChange={ handleChange }
      >
        <option data-testid="All-option" value="all">All</option>
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
          filteredNationality
          && filteredNationality.slice(0, DOZE).map((element, index) => (
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
