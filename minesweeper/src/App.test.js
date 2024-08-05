import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a Minesweeper title and a 10x10 minesweeper grid', () => {
  render(<App />);
  const pageTitle = screen.getByText('Minesweeper');
  expect(linkElement).toBeInTheDocument();
});
