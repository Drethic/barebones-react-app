import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import AxiosWithAuth from '../utils/AxiosWithAuth';
import CardContent from './Cards/Cards';

function Home(props) {
  const {
    user,
  } = props;
  const mockRecipes = [
    {
      recipe_id: 1,
      user_name: 'abc',
      category_name: 'Lunch',
      title: 'Fried Chicken',
      source: 'Grandma',
      description: 'Nice Taste',
      image_link: null,
    },
    {
      recipe_id: 2,
      user_name: 'abc',
      category_name: 'Lunch',
      title: 'Mom\'s Best Chicken',
      source: 'Momma',
      description: 'Sweet BBQ Chicken',
      image_link: null,
    },
    {
      recipe_id: 3,
      user_name: 'abc',
      category_name: 'Dinner',
      title: 'Italian Sausage Meat Balls',
      source: 'Grandma',
      description: 'Delicious with Garlic Bread',
      image_link: null,
    },
  ];
  const [userRecipes, setUserRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const getUserRecipes = () => {
    AxiosWithAuth()
      .get(`/users/${user.id}/recipes`)
      .then((res) => {
        console.log({ userRecipes: res.data });
        // setUserRecipes(res.data);
        setUserRecipes(mockRecipes);
        // setRecipes(res.data);
        setRecipes(mockRecipes);
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
        <CardContent recipes={recipes} />
      </div>
    </>
  );
}

export default Home;
