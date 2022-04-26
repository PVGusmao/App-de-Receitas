import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/login.css';
import UserContext from '../context/UserContext';

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const {
    userInfo,
    setUserInfo,
  } = useContext(UserContext);

  const validationLogin = () => {
    const six = 6;
    const validEmail = /\S+@\S+\.\S+/; // regex
    if (
      userInfo.password.length >= six && validEmail.test(userInfo.email) // para comparar o regex
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
    validationLogin();
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: userInfo.email }));
    history.push('/foods');
  };

  return (
    <section>
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
  );
}

export default Login;
