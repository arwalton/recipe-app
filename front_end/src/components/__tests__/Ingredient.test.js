import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import Ingredient from '../Ingredient';

it('renders without crashing', () => {
  render(<Ingredient></Ingredient>);
});

it('creates the button properly', () => {
  const NAME = 'testName';
  render(<Ingredient name={NAME}/>);
  expect(screen.getByRole('button', {name: NAME})).toBeInTheDocument();
})

it('calls the onclick prop on button click', () => {
  const MOCKFN = jest.fn();
  render(<Ingredient onIngredientChange={MOCKFN}/>);
  const TESTBUTTON = screen.getByRole('button');
  fireEvent.click(TESTBUTTON);
  expect(MOCKFN).toHaveBeenCalled();
})