import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
test('sanity', () => {
  expect(true).toBe(false)
})
test('Spinner renders when on prop is true', () => {
  render(<Spinner on={true} />);


  const spinner = screen.getByTestId('spinner');
  expect(spinner).toBeInTheDocument();
  expect(spinner).toHaveTextContent('Please wait...');
});

test('Spinner does not render when on prop is false', () => {
  
  render(<Spinner on={false} />);

  
  const spinner = screen.queryByTestId('spinner');
  expect(spinner).not.toBeInTheDocument();
});