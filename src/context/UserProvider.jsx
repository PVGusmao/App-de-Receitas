import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import UserContext from './UserContext';
import { getByFirstLetter, getByIngredients, getByName } from '../services/api';

function UserProvider({ children }) {
  const history = useHistory();
  const [enableSearchBar, setEnableSearchBar] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    value: '',
    selectedRadio: '',
    path: '',
  });
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleClick = () => {
    const { path, value, selectedRadio } = search;
    if (selectedRadio === 'ingredients') {
      getByIngredients(path, value).then((element) => setData(element));
    } else if (selectedRadio === 'name') {
      getByName(path, value).then((element) => setData(element));
    } else if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getByFirstLetter(path, value).then((element) => setData(element));
    }
  };

  const handleSerchBar = () => {
    setEnableSearchBar(!enableSearchBar);
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      const { path } = search;
      const list = data.drinks ?? data.meals;
      if (list.length === 1) {
        history.push(`/${path}/${list[0].idDrink ?? list[0].idMeal}`);
      }
    }
  }, [data, history, search]);

  const { Provider } = UserContext;
  return (
    <Provider
      value={ {
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
