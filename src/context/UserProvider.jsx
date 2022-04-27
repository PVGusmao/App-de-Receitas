import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import UserContext from './UserContext';
import { getByFirstLetter, getByIngredients, getByName } from '../services/api';
// import useFetch from '../hooks/useFetch';

function UserProvider({ children }) {
  const history = useHistory();
  const [enableSearchBar, setEnableSearchBar] = useState(false);
  const [search, setSearch] = useState({
    search: '',
    selectedRadio: '',
    path: '',
  });
  const [fetch, setFetchSearch] = useState([]);
  // const [fetch, setFetchSearch] = useFetch(search);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  // useEffect(() => {
  //   if (search.selectedRadio === 'ingredients') {
  //     getByIngredients(search.path, search.search)
  //       .then((element) => setFetchSearch(element));
  //   } else if (search.selectedRadio === 'name') {
  //     getByName(search.path, search.search)
  //       .then((element) => setFetchSearch(element));
  //   } else if (search.search.length > 1) {
  //     global.alert('Your search must have only 1 (one) character');
  //   } else {
  //     getByFirstLetter(search.path, search.search)
  //       .then((element) => setFetchSearch(element));
  //   }
  // }, [search, setFetchSearch]);

  // useEffect(() => {
  //   setFetchSearch({ ...search });
  // }, [search, setFetchSearch]);

  useEffect(() => {
    const list = fetch.meals ?? fetch.drinks;
    if (list && list.length === 1) {
      history.push(`/${search.path}/${list[0].idDrink ?? list[0].idMeal}`);
    }
  }, [fetch, history, search]);

  const handleSerchBar = () => {
    setEnableSearchBar(!enableSearchBar);
  };

  const handleClick = (value) => {
    setSearch(value);
  };

  const { Provider } = UserContext;
  return (
    <Provider
      value={ {
        fetch,
        search,
        enableSearchBar,
        userInfo,
        setUserInfo,
        handleSerchBar,
        setSearch,
        handleClick,
      } }
    >
      { children }
    </Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.instanceOf(PropTypes.object),
}.isRequired;

export default UserProvider;
