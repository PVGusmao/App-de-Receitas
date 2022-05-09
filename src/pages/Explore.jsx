import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <>
      <Header title="Explore" />
      <button data-testid="explore-foods" type="button">
        Explore Foods
      </button>
      <button data-testid="explore-drinks" type="button">
        Explore Drinks
      </button>
      <Footer />
    </>
  );
}

export default Explore;
