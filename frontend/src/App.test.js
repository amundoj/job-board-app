import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders job board title', () => {
  render(<App />);
  const titleElement = screen.getByText(/job board/i);
  expect(titleElement).toBeInTheDocument();
});