import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import SearchResults from '../components/SearchResults/SearchResults';
import type { CharacterCard } from '../types/SearchResults';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = useNavigate as jest.Mock;

const mockResults: CharacterCard[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/4/',
  },
];

describe('SearchResults', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders the specified number of cards', () => {
    render(
      <MemoryRouter initialEntries={[`/?page=1&search=Luke`]}>
        <SearchResults results={mockResults} />
      </MemoryRouter>,
    );

    const cards = screen.getAllByRole('button');
    expect(cards).toHaveLength(mockResults.length);
  });

  it('displays appropriate message if no cards are present', () => {
    render(
      <MemoryRouter initialEntries={[`/?page=1&search=Luke`]}>
        <SearchResults results={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  it('calls navigate with correct parameters when a card is clicked', () => {
    render(
      <MemoryRouter initialEntries={[`/?page=1&search=Luke`]}>
        <SearchResults results={mockResults} />
      </MemoryRouter>,
    );

    const card = screen.getByText(/Luke Skywalker/i);
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/details/1?page=1&search=Luke');
  });
});
