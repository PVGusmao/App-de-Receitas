import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

function Cards(props) {
  const match = useRouteMatch();
  const { index, title, image, id } = props;
  const path = match.path.split('/')[1];
  return (
    <Link to={ `/${path}/${id}` }>
      <div data-testid={ `${index}-recipe-card` } className="card">
        <img data-testid={ `${index}-card-img` } src={ image } alt={ title } />
        <h3 data-testid={ `${index}-card-name` }>{ title }</h3>
      </div>
    </Link>
  );
}

Cards.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default Cards;
