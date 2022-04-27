import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
// import { getByFirstLetter, getByIngredients, getByName } from '../services/api';
import useFetch from '../hooks/useFetch';

function UserProvider({ children }) {
  const [enableSearchBar, setEnableSearchBar] = useState(false);
  const [path, setPath] = useState();
  const [search, setSearch] = useState({
    search: '',
    selectedRadio: '',
  });
  const [fetch, setFetchSearch] = useFetch(search, path);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setFetchSearch({ ...search, path });
  }, [search, setFetchSearch, path]);

  const handleSerchBar = () => {
    setEnableSearchBar(!enableSearchBar);
  };

  const handleClick = (value, way) => {
    setSearch(value);
    setPath(way);
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
