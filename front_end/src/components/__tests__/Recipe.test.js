import React from 'react'
import { render, /* screen */ } from '@testing-library/react';
import Recipe from '../Recipe';

it('renders without crashing', () => {
    const RECIPEPROP = {
        "id": 1234,
        "name": "Awesome Meal",
        "source": "food.com",
        "author": "Chef Charlie",
        "link": "https://www.food.com/chef-charlie/awesome-meal",
        "percentage": 83,
        "ingredients": [
        {
            "id": 1,
            "group": "Protein",
            "name": "Chicken"
        },
        {
            "id": 15,
            "group": "Spices",
            "name": "Garam Masala"
        }
        ]
    }

  render(<Recipe recipe={RECIPEPROP}></Recipe>);
});