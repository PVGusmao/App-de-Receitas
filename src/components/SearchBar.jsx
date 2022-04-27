import React, { useContext } from 'react';
import '../assets/searchBar.css';
import UserContext from '../context/UserContext';

function SearchBar() {
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
          name="search"
          id="search"
          onChange={ (e) => {
            setSearch({ ...search, [e.target.name]: e.target.value });
          } }
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
            onChange={ (e) => {
              setSearch({ ...search, selectedRadio: e.target.value });
            } }
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
            onChange={ (e) => {
              setSearch({ ...search, selectedRadio: e.target.value });
            } }
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
            onChange={ (e) => {
              setSearch({ ...search, selectedRadio: e.target.value });
            } }
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
