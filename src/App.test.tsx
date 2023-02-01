import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders container with a className = container', async () => {
  render(<App />);
  const element = await screen.findByTestId('container-element');
  expect(element).toBeInTheDocument();
});

// mock context - check if putData rusn on button click
