import React from 'react'
import { render, /* screen */ } from '@testing-library/react';
import IngredientGroupList from '../IngredientGroupList';

it('renders without crashing', () => {
    let ingredientProp = [
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
  render(<IngredientGroupList ingredients={ingredientProp}></IngredientGroupList>);
});