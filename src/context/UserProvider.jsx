import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [enableSearchBar, setEnableSearchBar] = useState(false);

  const handleSerchBar = () => {
    setEnableSearchBar(!enableSearchBar);
  };

  const { Provider } = UserContext;
  return (
    <Provider
      value={ {
        enableSearchBar,
        userInfo,
        setUserInfo,
        handleSerchBar,
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
