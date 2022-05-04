import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

function Cards(props) {
  const match = useRouteMatch();
  const { index, title, image, id, details } = props;
  const path = match.path.split('/')[1];
  return (
    <Link
      data-testid={ `${index}-recomendation-card` }
      to={ `/${path}/${id}` }
    >
      <div
        data-testid={ `${index}-recipe-card` }
        className="card"
        style={ {
          width: details && 'max-content',
        } }
      >
        {
          details && (
            <h1
              data-testid={ `${index}-recomendation-title` }
            >
              { title }
            </h1>)
        }
        <img
          data-testid={ `${index}-card-img` }
          src={ image }
          alt={ title }
          style={ {
            height: details && '227px',
            width: details && '227px',
          } }
        />
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
