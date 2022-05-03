import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import UserContext from './UserContext';
import { getByFirstLetter, getByIngredients, getByName,
  getCategory,
  getCategoryFilter } from '../services/api';

function UserProvider({ children }) {
  const history = useHistory();
  const [enableSearchBar, setEnableSearchBar] = useState(false);
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [search, setSearch] = useState({
    value: '',
    selectedRadio: '',
    path: '',
  });
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const categoryFilterFood = async (selectedCategory) => {
    const apiFilterCategory = await getCategoryFilter('foods', selectedCategory);
    setFilterCategory(selectedCategory);
    setCategoryData(apiFilterCategory);
  };

  const categoryFilterDrink = async (selectedCategory) => {
    const apiFilterCategory = await getCategoryFilter('drink', selectedCategory);
    setFilterCategory(selectedCategory);
    setCategoryData(apiFilterCategory);
  };

  const getStateCategoryFood = async () => {
    const apiCategory = await getCategory('foods');
    const categories = apiCategory.meals.map((elen) => elen.strCategory);
    setCategory(categories);
  };

  const getStateCategoryDrinks = async () => {
    const apiCategory = await getCategory('drinks');
    const categories = apiCategory.drinks.map((elen) => elen.strCategory);
    setCategory(categories);
  };

  const handleClick = () => {
    const { path, value, selectedRadio } = search;
    if (selectedRadio === 'ingredients') {
      getByIngredients(path, value).then((element) => setData(element));
    } else if (selectedRadio === 'name') {
      getByName(path, value).then((element) => setData(element));
    } else if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getByFirstLetter(path, value).then((element) => setData(element));
    }
  };

  const handleSerchBar = () => {
    setEnableSearchBar(!enableSearchBar);
  };

  useEffect(() => {
    const item = search.path === 'foods' ? 'meals' : 'drinks';
    if ((Object.keys(data).length && !data[item]) === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (Object.keys(data).length) {
      const { path } = search;
      const list = data.drinks ?? data.meals;
      if (list && list.length === 1 && !filterCategory) {
        console.log(path);
        history.push(`/${path}/${list[0].idDrink ?? list[0].idMeal}`);
      }
    }
  }, [data, history, search]);

  const initialRequestFood = () => {
    getByName('foods', '').then((element) => setData(element));
  };

  const initialRequestDrink = () => {
    getByName('drinks', '').then((element) => setData(element));
  };

  const { Provider } = UserContext;
  return (
    <Provider
      value={ {
        search,
        enableSearchBar,
        userInfo,
        data,
        category,
        filterCategory,
        categoryData,
        setUserInfo,
        handleSerchBar,
        setSearch,
        handleClick,
        initialRequestFood,
        initialRequestDrink,
        getStateCategoryFood,
        getStateCategoryDrinks,
        categoryFilterFood,
        categoryFilterDrink,
        setFilterCategory,
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
