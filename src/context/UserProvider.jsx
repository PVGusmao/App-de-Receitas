import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import { getByFirstLetter, getByIngredients, getByName } from '../services/api';

function UserProvider({ children }) {
  const [enableSearchBar, setEnableSearchBar] = useState(false);
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
      getByIngredients(path, value).then((element) => console.log(element));
    } else if (selectedRadio === 'name') {
      getByName(path, value).then((element) => console.log(element));
    } else if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getByFirstLetter(path, value).then((element) => console.log(element));
    }
  };

  const handleSerchBar = () => {
    setEnableSearchBar(!enableSearchBar);
  };

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
