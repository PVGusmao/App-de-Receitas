import React from 'react';

function SearchBar() {
  return (
    <div className="serach-wrapper">
      <label htmlFor="search">
        <input
          data-testid="search-input"
          className="search"
          type="text"
          name="search"
          id="search"
        />
      </label>
    </div>
  );
}

export default SearchBar;
