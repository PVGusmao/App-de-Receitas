import React from 'react';
import { getStorage } from '../services/storage';

function ProfileCard() {
  return (
    <section>
      <h1 data-testid="profile-email">{ getStorage('user').email }</h1>
      <button data-testid="profile-done-btn" type="button">Done Recipes</button>
      <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
      <button data-testid="profile-logout-btn" type="button">Logout</button>
    </section>
  );
}

export default ProfileCard;
