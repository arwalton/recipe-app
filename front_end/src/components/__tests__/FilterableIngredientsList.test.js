import React from 'react'
import { render, /* screen */ } from '@testing-library/react';
import FilterableIngredientsList from '../FilterableIngredientsList';
import { BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
  render(<BrowserRouter> <FilterableIngredientsList /> </BrowserRouter>);
});