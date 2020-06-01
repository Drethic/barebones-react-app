import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import AxiosWithAuth from '../utils/AxiosWithAuth';
import Cards from './Cards/Cards';

function Home(props) {
  const {
    user,
  } = props;
  const [userRecipes, setUserRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const getUserRecipes = () => {
    AxiosWithAuth()
      .get(`/users/${user.id}/recipes`)
      .then((res) => {
        console.log({ userRecipes: res.data });
        setUserRecipes(res.data);
        setRecipes(res.data);
      })
      .catch((err) => console.log('User Get Err:', err));
  };

  const formik = useFormik({
    initialValues: {
      searchbar: '',
    },
    onSubmit: (values, { resetForm }) => {
      const searchTerm = values.searchbar;
      const results = userRecipes.filter((recipe) => (
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        || recipe.category_name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      setRecipes(results);
      resetForm();
    },
  });

  const clearSearch = () => setRecipes(userRecipes);

  // Get User Recipes on load
  const savedGetUserRecipes = useRef();
  useEffect(() => {
    savedGetUserRecipes.current = getUserRecipes;
  });
  useEffect(() => {
    savedGetUserRecipes.current();
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="searchbar">
          <input
            id="searchbar"
            name="searchbar"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.searchbar}
          />
        </label>
        <button type="submit">Search</button>
        <button type="button" onClick={clearSearch}>Clear</button>
      </form>
      <div>
        <Cards recipes={recipes} />
      </div>
    </>
  );
}

export default Home;
