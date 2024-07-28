import { render, fireEvent } from '@testing-library/react';
import SearchButton from '../components/Search/SearchButton';

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<SearchButton onClick={handleClick} />);
  const button = getByText(/Search/i);

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
