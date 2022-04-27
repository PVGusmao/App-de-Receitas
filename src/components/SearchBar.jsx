import React from 'react';
import '../assets/searchBar.css';

function SearchBar() {
  return (
    <div className="search-wrapper">
      <label className="label-search" htmlFor="search">
        <input
          data-testid="search-input"
          className="search"
          type="text"
          name="search"
          id="search"
        />
      </label>
      <div className="radio-button-wrapper">
        <label className="radio-ingredients" htmlFor="ingredients">
          Ingredients
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="categories"
            id="ingredients"
          />
        </label>

        <label className="radio-name" htmlFor="name">
          Name
          <input
            data-testid="name-search-radio"
            type="radio"
            name="categories"
            id="name"
          />
        </label>

        <label className="radio-first-letter" htmlFor="first-letter">
          First Letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="categories"
            id="first-letter"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="button-search"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
