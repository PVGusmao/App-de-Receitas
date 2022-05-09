import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getStorage, setStorage } from '../services/storage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const MSG_TIMEOUT = 3000;

function HorizontalCard(props) {
  const [shared, setShared] = useState(false);
  const { index, recipe, favorite, updateRecipes } = props;
  const { id, type, name, image, doneDate, tags,
    category, alcoholicOrNot, nationality } = recipe;

  const handleShare = () => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setShared(true);
    setTimeout(() => setShared(false), MSG_TIMEOUT);
  };

  const handleFavorite = () => {
    setStorage('favoriteRecipes', getStorage('favoriteRecipes')
      .filter((element) => element.id !== id));
    updateRecipes();
  };

  return (
    <div className="card">
      <Link
        to={ `/${type}s/${id}` }
      >
        <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
        <img
          style={ { maxWidth: '100vw' } }
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot }
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>

      { shared && <p>Link copied!</p> }
      <button type="button" onClick={ handleShare }>
        <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="Share recipe"
        />
      </button>

      { favorite
        ? (
          <button type="button" onClick={ handleFavorite }>
            <img
              src={ blackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="Unfavorite recipe"
            />
          </button>
        ) : (
          <p>
            { 'Tags: ' }
            { tags.map((elem) => (
              <span key={ elem } data-testid={ `${index}-${elem}-horizontal-tag` }>
                { elem }
              </span>
            ))}
          </p>
        )}
    </div>
  );
}

HorizontalCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.object,
  favorite: PropTypes.bool,
  updateRecipes: PropTypes.func,
}.isRequired;

export default HorizontalCard;
