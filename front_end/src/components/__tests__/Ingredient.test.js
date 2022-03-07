import React from 'react'
import { render, /* screen */ } from '@testing-library/react';
import Ingredient from '../Ingredient';

it('renders without crashing', () => {
  render(<Ingredient></Ingredient>);
});