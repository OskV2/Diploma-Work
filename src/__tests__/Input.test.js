import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../renderer/components/Input/Input'

describe('Input component', () => {

  test('renders without errors', () => {
    render(<Input setSelectedFile={null} />);
    const header = screen.getByText('Prześlij plik', { exact: false, selector: '.input__title' });
    expect(header).toBeInTheDocument();
  });

  test('handles drag and drop correctly', () => {
    render(<Input setSelectedFile={null} />);
    const label = screen.getByTestId('label-file-upload-test');
    fireEvent.dragEnter(label);
    expect(label).toHaveClass('dragging');
    fireEvent.dragLeave(label);
  });
});
