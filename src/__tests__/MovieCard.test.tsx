import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard';

describe('MovieCard - Component Test', () => {
  it('should render a card element', async () => {
    render(<MovieCard />);
    const element = await screen.findByTestId('container-element');
    expect(element).toBeInTheDocument();
  });

  it('should render a button with a text accept', async () => {
    render(<MovieCard />);
    const element = await screen.findByText('Accept');
    expect(element).toBeInTheDocument();
  });
});
