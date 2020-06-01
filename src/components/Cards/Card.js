import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Modal,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../../css/Card.css';
import AxiosWithAuth from '../../utils/AxiosWithAuth';

const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '27%',
    margin: '1%',
  },
  media: {
    height: 300,
    width: 'auto',
  },
  paper: {
    position: 'absolute',
    overflow: 'scroll',
    width: 800,
    height: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function RecipeCard(props) {
  const {
    recipe,
    recipeData,
  } = props;
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [recipeDetails, setRecipeDetails] = useState({
    ...recipe,
    ingredients: [
      {
        ingredient: '',
        unit: '',
        quantity: '',
        ingredient_id: 0,
      },
    ],
    instructions: [
      {
        step_no: '',
        instruction: '',
        id: 0,
      },
    ],
  });
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
    AxiosWithAuth()
      .get(`/recipes/${recipeData.recipe_id}`)
      .then((res) => {
        setRecipeDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log('User Get Err:', err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cardModal = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <CardMedia
          className={classes.media}
          image={recipeDetails.image_link === '' ? 'https://via.placeholder.com/150' : recipeDetails.image_link}
          title={recipeDetails.title}
        />
        <CardHeader className="subHeaders" title={recipeDetails.title} />
        <p className="subHeaders">{recipeDetails.source}</p>
        <h2 className="subHeaders">Ingredients</h2>
        <CardContent>
          {recipeDetails.ingredients.map((ingredient) => (
            <div key={ingredient.ingredient_id} className="ingredient">
              <div className="ingredientContainer">
                <p className="quantity">{ingredient.quantity}</p>
                <p className="unit">{ingredient.unit}</p>
                <p className="detail">{ingredient.ingredient}</p>
              </div>
            </div>
          ))}
          <h2 className="subHeaders">Instructions</h2>
          <div className="instructionsContainer">
            {recipeDetails.instructions.map((instruction) => (
              <div key={instruction.id} className="instruction">
                <div className="step-no">{instruction.step_no}</div>
                <div className="detal">{instruction.instruction}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="fullCard"
        aria-describedby="fullCard"
      >
        {cardModal}
      </Modal>
      <Card className={classes.root} variant="outlined" onClick={handleOpen}>
        <CardMedia
          className={classes.media}
          image={recipeData.image_link === null ? 'https://via.placeholder.com/150' : recipeData.image_link}
          title={recipeData.title}
        />
        <CardHeader className="subHeaders" title={recipeData.title} />
        <CardContent>
          <p>{recipeData.description}</p>
        </CardContent>
        <p>{recipeData.category_name}</p>
      </Card>
    </>
  );
}

export default RecipeCard;
