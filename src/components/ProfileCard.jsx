import React from 'react';
import { useHistory } from 'react-router-dom';
import { getStorage } from '../services/storage';
import '../assets/profileCard.css';

function ProfileCard() {
  const history = useHistory();

  const handlePush = ({ target }) => {
    if (target.id === '') {
      localStorage.clear();
    }
    history.push(`/${target.id}`);
  };

  return (
    <section className="profile-card-wrapper">
      <div className="button-wrapper">

        <h1 data-testid="profile-email">{ getStorage('user').email }</h1>

        <button
          className="button"
          data-testid="profile-done-btn"
          type="button"
          onClick={ handlePush }
          id="done-recipes"
        >
          Done Recipes
        </button>

        <button
          className="button"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ handlePush }
          id="favorite-recipes"
        >
          Favorite Recipes
        </button>

        <button
          className="button"
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handlePush }
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default ProfileCard;
