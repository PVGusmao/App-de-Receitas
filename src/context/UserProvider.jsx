import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import UserContext from './UserContext';
import { getByFirstLetter, getByIngredients, getByName,
  getCategory, getCategoryFilter } from '../services/api';

function UserProvider({ children }) {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.match(/\/(foods|drinks)/)?.[1];
  const pathAlt = path === 'foods' ? 'meals' : 'drinks';
  const [enableSearchBar, setEnableSearchBar] = useState(false);
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [search, setSearch] = useState({
    value: '',
    selectedRadio: '',
  });
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const filterByCategory = async (selectedCategory) => {
    const apiFilterCategory = await getCategoryFilter(path, selectedCategory);
    setFilterCategory(selectedCategory);
    setCategoryData(apiFilterCategory);
  };

  const getStateCategory = async () => {
    const apiCategory = await getCategory(path);
    const categories = apiCategory[pathAlt].map((elen) => elen.strCategory);
    setCategoryList(categories);
  };

  const handleClick = async () => {
    const { value, selectedRadio } = search;
    let apiResults;
    if (selectedRadio === 'ingredients') {
      apiResults = await getByIngredients(path, value);
    } else if (selectedRadio === 'name') {
      apiResults = await getByName(path, value);
    } else if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    } else {
      apiResults = await getByFirstLetter(path, value);
    }
    setData(apiResults);

    // Post-click checks
    const list = apiResults[pathAlt];
    if (list === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (list.length === 1 && !filterCategory) {
      history.push(`/${path}/${list[0].idDrink ?? list[0].idMeal}`);
    }
  };

  const handleSearchBar = () => {
    setEnableSearchBar(!enableSearchBar);
  };

  const initialRequest = () => {
    setFilterCategory('');
    getByName(path, '').then((element) => setData(element));
  };

  const { Provider } = UserContext;
  return (
    <Provider
      value={ {
        search,
        enableSearchBar,
        userInfo,
        data,
        categoryData,
        categoryList,
        filterCategory,
        path,
        setUserInfo,
        handleSearchBar,
        setSearch,
        handleClick,
        initialRequest,
        getStateCategory,
        filterByCategory,
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
