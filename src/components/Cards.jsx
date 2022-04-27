import React from 'react';
import PropTypes from 'prop-types';

function Cards(props) {
  const { index, title, image } = props;
  return (
    <div data-testid={ `${index}-recipe-card` } className="card">
      <img data-testid={ `${index}-card-img` } src={ image } alt={ title } />
      <h3 data-testid={ `${index}-card-name` }>{ title }</h3>
    </div>
  );
}

Cards.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default Cards;
