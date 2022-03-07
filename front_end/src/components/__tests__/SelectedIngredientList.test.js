import React from 'react'
import { render, /* screen */ } from '@testing-library/react';
import selectedIngredientList from '../SelectedIngredientList';
import SelectedIngredientList from '../SelectedIngredientList';

it('renders without crashing', () => {
  render(<SelectedIngredientList selections={{}}/>);
});