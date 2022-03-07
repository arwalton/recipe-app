import React from 'react'
import { render, /* screen */ } from '@testing-library/react';
import ResultsPageList from '../ResultsPageList';
import { BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
  render(<BrowserRouter><ResultsPageList /></BrowserRouter>);
});