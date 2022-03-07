import React from 'react'
import { render, /* screen */ } from '@testing-library/react';
import IngredientList from '../IngredientList';


it('renders without crashing', () => {
  const INGREDIENTPROP = [
      {
      "id": 1,
      "group": "Protein",
      "name": "Chicken"
      },
      {
      "id": 3,
      "group": "Protein",
      "name": "Pork"
      }
  ]
render(<IngredientList ingredients={INGREDIENTPROP}></IngredientList>);
});