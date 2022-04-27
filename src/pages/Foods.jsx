import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import UserContext from '../context/UserContext';

function Foods() {
  const {
    enableSearchBar,
  } = useContext(UserContext);

  return (
    <>
      <Header title="Foods" />
      {
        enableSearchBar && <SearchBar />
      }
    </>
  );
}

export default Foods;
