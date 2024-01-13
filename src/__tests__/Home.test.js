import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../renderer/App';

describe('Home page should render', () => {
  test('use chart button', () => {
    render(<App />);
    const button = screen.getByText('Użyj wykresu');
    expect(button).toBeInTheDocument();
  });

  test('about button', () => {
    render(<App />);
    const button = screen.getByText('O aplikacji');
    expect(button).toBeInTheDocument();
  });
});
