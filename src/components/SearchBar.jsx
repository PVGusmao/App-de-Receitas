import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/searchBar.css';
import UserContext from '../context/UserContext';

function SearchBar() {
  const match = useRouteMatch();
  const {
    search,
    setSearch,
    handleClick,
  } = useContext(UserContext);

  return (
    <div className="search-wrapper">
      <label className="label-search" htmlFor="search">
        <input
          data-testid="search-input"
          className="search"
          type="text"
          name="value"
          id="search"
          onChange={
            ({ target }) => setSearch({
              ...search,
              [target.name]: target.value,
              path: match.path.split('/')[1],
            })
          }
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
            value="ingredients"
            onChange={
              ({ target }) => setSearch({ ...search, selectedRadio: target.value })
            }
          />
        </label>

        <label className="radio-name" htmlFor="name">
          Name
          <input
            data-testid="name-search-radio"
            type="radio"
            name="categories"
            id="name"
            value="name"
            onChange={
              ({ target }) => setSearch({ ...search, selectedRadio: target.value })
            }
          />
        </label>

        <label className="radio-first-letter" htmlFor="first-letter">
          First Letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="categories"
            id="first-letter"
            value="first-letter"
            onChange={
              ({ target }) => setSearch({ ...search, selectedRadio: target.value })
            }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="button-search"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
