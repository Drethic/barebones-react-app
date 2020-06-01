import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
} from '@material-ui/core/';
// import { Formik } from 'formik';
import RecipeForm from './Forms/RecipeForm';
import IngredientForm from './Forms/IngredientForm';
import InstructionsForm from './Forms/InstructionsForm';
import AxiosWithAuth from '../../utils/AxiosWithAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Recipe', 'Ingredients', 'Instructions'];
}

export default function AddRecipeStepper(props) {
  const {
    user,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [recipeObject, setRecipeObject] = useState({
    user_id: user.id,
    category_id: '',
    title: '',
    description: '',
    source: '',
    image_link: '',
    ingredients: [],
    instructions: [],
  });

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

  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    AxiosWithAuth()
      .get('/categories')
      .then((res) => {
        console.log({ categories: res.data });
        setCategories(res.data);
      })
      .catch((err) => console.log('User Get Err:', err));
  };

  // Get User Recipes/Units/Ingredients on load
  const savedGetUnits = useRef();
  const savedGetIngredients = useRef();
  const savedGetCategories = useRef();
  useEffect(() => {
    savedGetUnits.current = getUnits;
    savedGetIngredients.current = getIngredients;
    savedGetCategories.current = getCategories;
  });
  useEffect(() => {
    savedGetUnits.current();
    savedGetIngredients.current();
    savedGetCategories.current();
  }, []);

  const handleSubmit = async () => {
    AxiosWithAuth()
      .post('/recipes', recipeObject)
      .then((res) => {
        console.log({ recipeResponse: res.data });
        history.push(`${process.env.PUBLIC_URL}/recipes-home`);
      })
      .catch((err) => console.log({ addRecipe: err }));
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <RecipeForm
              recipeObject={recipeObject}
              setRecipeObject={setRecipeObject}
              categories={categories}
            />
          </>
        );
      case 1:
        return (
          <>
            <IngredientForm
              recipeObject={recipeObject}
              setRecipeObject={setRecipeObject}
              units={units}
              ingredients={ingredients}
            />
          </>
        );
      case 2:
        return (
          <>
            <InstructionsForm recipeObject={recipeObject} setRecipeObject={setRecipeObject} />
          </>
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <p>All steps completed</p>
            <Button onClick={handleSubmit}>Submit Recipe</Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
