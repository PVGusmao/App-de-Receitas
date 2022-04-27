import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';
import DrinkDetail from '../pages/DrinkDetail';
import DrinkIngredients from '../pages/DrinkIngredients';
import DrinkProgress from '../pages/DrinkProgress';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoods from '../pages/ExploreFoods';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodDetail from '../pages/FoodDetail';
import FoodIngredients from '../pages/FoodIngredients';
import FoodNationalites from '../pages/FoodNationalites';
import FoodProgress from '../pages/FoodProgress';
import Foods from '../pages/Foods';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';

function WillOpen() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/foods/:id-da-receita" component={ FoodDetail } />
      <Route path="/drinks/:id-da-receita" component={ DrinkDetail } />
      <Route path="/foods/:id-da-receita/in-progress" component={ FoodProgress } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ DrinkProgress } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route path="/explore/foods/ingredients" component={ FoodIngredients } />
      <Route path="/explore/drinks/ingredients" component={ DrinkIngredients } />
      <Route path="/explore/foods/nationalities" component={ FoodNationalites } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}

export default WillOpen;
