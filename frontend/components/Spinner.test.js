import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
import '@testing-library/jest-dom'
// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
test('sanity', () => {
  expect(true).toBe(true)
})


test('Spinner renders when on prop is true', () => {
  render(<Spinner on={true} />);
  const spinner = screen.queryByTestId('spinner');
  console.log('test', spinner)
  expect(spinner).toBeInTheDocument();
});


test('Spinner does not render when on prop is false', () => {
  render(<Spinner on={false} />);
  const spinner = screen.queryByTestId('spinner');
  console.log('test', spinner)
  expect(spinner).not.toBeInTheDocument();
});