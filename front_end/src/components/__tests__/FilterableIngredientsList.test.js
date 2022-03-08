import React from 'react'
import { render, screen } from '@testing-library/react';
import FilterableIngredientsList from '../FilterableIngredientsList';
import { BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
  render(<BrowserRouter> <FilterableIngredientsList /> </BrowserRouter>);
});

it('renders the header message', () => {
  render(<BrowserRouter> <FilterableIngredientsList /> </BrowserRouter>);
  expect(screen.getByText('What Do you want to cook today?')).toBeInTheDocument();
})

it('clears local storage', () => {
  render(<BrowserRouter> <FilterableIngredientsList /> </BrowserRouter>);
  expect(localStorage.length).toBe(0);
})

