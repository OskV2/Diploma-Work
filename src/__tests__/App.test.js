import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

// tests if app start correctly
describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
