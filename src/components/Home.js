import React, { useState, useEffect } from 'react';
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
  const [userRecipes, setUserRecipes] = useState(mockRecipes);
  const getUserRecipes = () => {
    AxiosWithAuth()
      .get(`/users/${user.id}/recipes`)
      .then((res) => {
        console.log({ response: res.data });
        setUserRecipes(res.data);
      })
      .catch((err) => console.log('User Get Err:', err));
  };
  const [allRecipes, setAllRecipes] = useState([]);
  const getAllRecipes = () => {
    AxiosWithAuth()
      .get('/recipes')
      .then((res) => {
        console.log({ response: res.data });
        setAllRecipes(res.data);
      })
      .catch((err) => console.log('User Get Err:', err));
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const results = allRecipes.filter((recipe) => (
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      || recipe.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    setSearchResults(results);
  }, [allRecipes, searchTerm]);

  const formik = useFormik({
    initialValues: {
      searchbar: '',
    },
    onSubmit: (values) => {
      console.log({ values });
      getAllRecipes();
      setSearchTerm(values.searchbar);
    },
  });

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
      </form>
      <ul>
        {searchResults.map((item) => (
          <li key={item.recipe_id}>{item.title}</li>
        ))}
      </ul>
      <div>
        <CardContent recipes={userRecipes} />
        <button type="button" onClick={getUserRecipes}>Get current user recipes</button>
      </div>
    </>
  );
}
export default Home;
