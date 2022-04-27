import { useEffect, useState } from 'react';
import { getByFirstLetter, getByIngredients, getByName } from '../services/api';

function useFetch(props) {
  const { search, path } = props;
  const [fetchSearch, setfetchSearch] = useState({
    search: search.search,
    selectedRadio: search.selectedRadio,
    path,
  });
  const [fetch, setFetch] = useState([]);
  useEffect(() => {
    if (fetchSearch.selectedRadio === 'ingredients') {
      getByIngredients(fetchSearch.path, fetchSearch.search)
        .then((element) => setFetch(element));
    } else if (fetchSearch.selectedRadio === 'name') {
      getByName(fetchSearch.path, fetchSearch.search)
        .then((element) => setFetch(element));
    } else if (fetchSearch.search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getByFirstLetter(fetchSearch.path, fetchSearch.search)
        .then((element) => setFetch(element));
    }
    console.log(fetchSearch.path);
  }, [fetchSearch, path]);

  return [fetch, setfetchSearch];
}

export default useFetch;
