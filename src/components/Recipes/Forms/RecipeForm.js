import React from 'react';
import { AppBar, TextField, FormControl } from '@material-ui/core/';
// import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function RecipeForm(props) {
  const {
    categories,
    recipeObject,
    setRecipeObject,
  } = props;

  // const recipeSchema = {
  //   category: yup
  //     .string('You must choose a category.').max(120, 'Your category name is too long.')
  //     .required('Please choose a category.'),
  //   title: yup
  //     .string('You must have a name for your recipe.').max(120, 'Your recipe name is too long')
  //     .required('A recipe name is required.'),
  //   source: yup
  //     .string('Who made this?').max(120, 'The source name is too long.'),
  //   description: yup
  //     .string('You must enter a description.').max(250, 'Your description is too long.')
  //     .required('A description is required.'),
  //   image_link: yup
  //     .string()
  //     .url(
  //       'Please enter a valid URL.',
  //       /[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/ig
  //     ),
  // };


  const classes = useStyles();

  const handleChange = (input) => (
    (event) => (
      setRecipeObject({
        ...recipeObject,
        [input]: event.target.value,
      })
    )
  );


  return (
    <>
      <AppBar title="Recipes" />
      <TextField
        placeholder="Enter your title."
        label="Title"
        onChange={handleChange('title')}
        defaultValue={recipeObject.title}
        margin="normal"
        variant="outlined"
      />
      <br />
      <TextField
        placeholder="Who made this recipe?"
        label="source"
        onChange={handleChange('source')}
        defaultValue={recipeObject.source}
        margin="normal"
        variant="outlined"
      />
      <br />
      <TextField
        placeholder="Enter your description"
        label="description"
        onChange={handleChange('description')}
        defaultValue={recipeObject.description}
        margin="normal"
        variant="outlined"
      />
      <br />
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="category-select-outlined">Category</InputLabel>
        <Select
          native
          value={recipeObject.category_id}
          onChange={handleChange('category_id')}
          label="Category"
          inputProps={{
            name: 'category',
            id: 'category-select-outlined',
          }}
        >
          <option aria-label="None" value="" />
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <br />
      <TextField
        placeholder="Enter a link to an image."
        label="image_link"
        onChange={handleChange('image_link')}
        defaultValue={recipeObject.image_link}
        margin="normal"
        variant="outlined"
      />
      <br />
    </>
  );
}
