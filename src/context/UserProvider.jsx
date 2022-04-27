import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import { getByFirstLetter, getByIngredients, getByName } from '../services/api';

function UserProvider({ children }) {
  const [enableSearchBar, setEnableSearchBar] = useState(false);
  // const [fetch, setFetch] = useState([]);
  const [search, setSearch] = useState({
    search: '',
    selectedRadio: '',
  });
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleSerchBar = () => {
    setEnableSearchBar(!enableSearchBar);
  };

  const handleClick = () => {
    if (search.selectedRadio === 'ingredients') {
      getByIngredients(search.search).then((element) => console.log(element));
    } else if (search.selectedRadio === 'name') {
      getByName(search.search).then((element) => console.log(element));
    } else if (search.search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getByFirstLetter(search.search).then((element) => console.log(element));
    }
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
