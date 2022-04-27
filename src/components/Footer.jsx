import React from 'react';
import { Link } from 'react-router-dom';
import ExploreIcon from '../images/exploreIcon.svg';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import '../assets/footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img src={ DrinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explore">
        <img src={ ExploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/foods">
        <img src={ MealIcon } alt="Meal Icon" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
