import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const history = useHistory();
  const handleClick = ({ target }) => {
    history.push(`/explore/${target.id}s`);
  };

  return (
    <>
      <Header title="Explore" />
      <button
        onClick={ handleClick }
        id="food"
        data-testid="explore-foods"
        type="button"
      >
        Explore Foods
      </button>
      <button
        onClick={ handleClick }
        id="drink"
        data-testid="explore-drinks"
        type="button"
      >
        Explore Drinks
      </button>
      <Footer />
    </>
  );
}

export default Explore;
