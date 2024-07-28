import { render, fireEvent } from '@testing-library/react';
import CharacterCardTemplate from '../components/CharacterCard/CharacterCard';
import type { CharacterCard } from '../types/SearchResults';

const mockCharacter: CharacterCard = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  url: '',
};

describe('CharacterCardTemplate', () => {
  it('renders character details correctly', () => {
    const { getByText } = render(
      <CharacterCardTemplate {...mockCharacter} onClick={() => {}} />,
    );

    expect(getByText('Luke Skywalker')).toBeInTheDocument();
    expect(getByText('Height: 172 cm')).toBeInTheDocument();
    expect(getByText('Mass: 77 kg')).toBeInTheDocument();
    expect(getByText('Hair Color: blond')).toBeInTheDocument();
    expect(getByText('Skin Color: fair')).toBeInTheDocument();
    expect(getByText('Eye Color: blue')).toBeInTheDocument();
    expect(getByText('Birth Year: 19BBY')).toBeInTheDocument();
    expect(getByText('Gender: male')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <CharacterCardTemplate {...mockCharacter} onClick={handleClick} />,
    );

    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
