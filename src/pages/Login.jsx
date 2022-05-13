import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/login.css';
import UserContext from '../context/UserContext';
import { setStorage } from '../services/storage';

const MIN_PASSWORD = 6;

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const { userInfo, setUserInfo } = useContext(UserContext);

  const validationLogin = ({ email, password }) => {
    const validEmail = /\S+@\S+\.\S+/; // regex
    if (
      password.length > MIN_PASSWORD
      && validEmail.test(email) // para comparar o regex
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
    validationLogin({ ...userInfo, [target.name]: target.value });
  };

  const handleClick = () => {
    setStorage('mealsToken', 1);
    setStorage('cocktailsToken', 1);
    setStorage('user', { email: userInfo.email });
    history.push('/foods');
  };

  return (
    <section className="login-wrapper">
      <section className="login-container">
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="text"
            name="email"
            id="email"
            className="email"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            className="password"
            onChange={ handleChange }
          />
        </label>

        <button
          data-testid="login-submit-btn"
          type="button"
          className="button-submit"
          disabled={ isDisabled }
          onClick={ handleClick }
        >
          Submit
        </button>
      </section>
    </section>
  );
}

export default Login;
