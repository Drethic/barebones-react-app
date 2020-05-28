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
  const [newRecipe, setNewRecipe] = useState({
    recipe: {},
    ingredients: [],
    instructions: [],
  });
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

  const [ingredients, setIngredients] = useState([]);
  const getIngredients = () => {
    AxiosWithAuth()
      .get('/ingredients')
      .then((res) => {
        console.log({ ingredients: res.data });
        setIngredients(res.data);
      })
      .catch((err) => console.log('User Get Err:', err));
  };

  const [units, setUnits] = useState([]);
  const getUnits = () => {
    AxiosWithAuth()
      .get('/units')
      .then((res) => {
        console.log({ units: res.data });
        setUnits(res.data);
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

  // Get User Recipes/Units/Ingredients on load
  const savedGetUserRecipes = useRef();
  const savedGetUnits = useRef();
  const savedGetIngredients = useRef();
  useEffect(() => {
    savedGetUserRecipes.current = getUserRecipes;
    savedGetUnits.current = getUnits;
    savedGetIngredients.current = getIngredients;
  });
  useEffect(() => {
    savedGetUserRecipes.current();
    savedGetUnits.current();
    savedGetIngredients.current();
  }, []);

  // Start of making a fake recipe
  const fakeRecipe = {
    user_id: user.id,
    category_id: 1,
    title: 'Test Title',
    description: 'Test Description',
  };
  const addRecipeToState = () => {
    const updatedRecipe = {
      ...newRecipe,
      recipe: fakeRecipe,
    };
    console.log({ updatedRecipe });
    setNewRecipe(updatedRecipe);
  };

  const fakeExistingIngredients = ingredients.slice(2, 4);

  const instructionsToAdd = [];
  // TODO pass in instructions to push into state
  const addInstructionsToState = () => {
    for (let i = 1; i < 5; i += 1) {
      instructionsToAdd.push({
        step_no: `${i}`,
        instruction: `Step ${i}`,
      });
    }
    setNewRecipe({
      ...newRecipe,
      instructions: [
        ...newRecipe.instructions,
        ...instructionsToAdd,
      ],
    });
  };

  const postNewIngredients = async (mapIngredients) => (
    Promise.all(mapIngredients.map((ingredient) => (
      AxiosWithAuth()
        .post('/ingredients', ingredient)
        .then((res) => (
          {
            ...ingredient,
            ...res.data,
          }
        ))
    )))
  );

  const addIngredientToRecipe = (recipeId, ingredient) => {
    // {id: 4, name: "Garlic", quantity: 1.5, unit_id: 10}
    const recipeIng = {
      recipe_id: recipeId,
      unit_id: ingredient.unit_id,
      quantity: ingredient.quantity,
      ingredient_id: ingredient.id,
    };
    AxiosWithAuth()
      .post(`/recipes/${recipeId}/ingredients`, recipeIng)
      .then((res) => {
        console.log({ addIngredientToRecipeResponse: res.data });
        // No data to return; remove after testing
      })
      .catch((err) => console.log('User Get Err:', err));
  };

  const addIngredientsToRecipe = async (recipeId) => {
    if (newRecipe.ingredients.length > 0) {
      Promise.all(newRecipe.ingredients.map((ingredient) => (
        addIngredientToRecipe(recipeId, ingredient)
      )));
    }
  };

  const addInstructionToRecipe = (recipeId, instruction) => {
    const recipeInst = {
      recipe_id: recipeId,
      step_no: instruction.step_no,
      instruction: instruction.instruction,
    };
    AxiosWithAuth()
      .post('recipes_instructions', recipeInst)
      .then((res) => {
        console.log({ addInstructionToRecipe: res.data });
        // No data to return; remove after testing
      })
      .catch((err) => console.log('User Get Err:', err));
  };

  const addInstructionsToRecipe = async (recipeId) => {
    if (newRecipe.instructions.length > 0) {
      Promise.all(newRecipe.instructions.map((instruction) => (
        addInstructionToRecipe(recipeId, instruction)
      )));
    }
  };

  const setRecipeInState = () => {
    console.log('Adding fake recipe to state');
    addRecipeToState();
  };

  const setIngredientsToState = async () => {
    // Adds new ingredients (if any) to DB
    console.log('Adding new ingredients to DB');
    const ingredientsToAdd = [
      {
        name: 'Paprika2',
        unit_id: units[Math.abs(Math.floor(Math.random() * (1 - 12) + 1))].id,
        quantity: 1.5,
      },
      {
        name: 'Steak2',
        unit_id: units[Math.abs(Math.floor(Math.random() * (1 - 12) + 1))].id,
        quantity: 1.5,
      },
    ];
    const newIng = await postNewIngredients(ingredientsToAdd);
    console.log({ setIngNewIng: newIng });

    console.log('Adding fake ingredients to state');
    const randomNum = Math.abs(Math.floor(Math.random() * (1 - 12) + 1));
    const updatedIngredients = fakeExistingIngredients.map((ingredient) => ({
      ...ingredient,
      unit_id: units[randomNum].id,
      quantity: 1.5,
    }));
    setNewRecipe({
      ...newRecipe,
      ingredients: [
        ...newRecipe.ingredients,
        ...updatedIngredients,
        ...newIng,
      ],
    });
  };

  const setInstructionsToState = () => {
    console.log('Adding instructions to state');
    addInstructionsToState();
  };

  const addFakeRecipe = async () => {
    // Submit recipe
    const recipeData = await AxiosWithAuth().post('/recipes', fakeRecipe).then((res) => res.data);
    // Add ingredients to recipe
    await addIngredientsToRecipe(recipeData.recipe_id);
    // Add instructions to recipe
    await addInstructionsToRecipe(recipeData.recipe_id);
  };

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
        <button type="button" onClick={setRecipeInState}>Step 1 Next</button>
        <button type="button" onClick={setIngredientsToState}>Step 2 Next</button>
        <button type="button" onClick={setInstructionsToState}>Step 3 Next</button>
        <button type="button" onClick={addFakeRecipe}>Add Fake Recipe</button>
      </div>
    </>
  );
}

export default Home;
