import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import UserContext from '../context/UserContext';

function Drinks() {
  const {
    enableSearchBar,
  } = useContext(UserContext);
  return (
    <>
      <Header title="Drinks" />
      {
        enableSearchBar && <SearchBar />
      }
    </>
  );
}

export default Drinks;
