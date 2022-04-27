import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import UserContext from '../context/UserContext';
import Footer from '../components/Footer';

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
      <Footer />
    </>
  );
}

export default Foods;
