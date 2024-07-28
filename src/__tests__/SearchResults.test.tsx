import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/theme/ThemeContext'; // Импортируем ThemeProvider
import SearchResults from '../components/SearchResults/SearchResults';
import type { CharacterCard } from '../types/SearchResults';
import { toggleItem } from '@/slices/SelectedItemsSlice';

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

interface RootState {
  selectedItems: { selectedItems: { [key: string]: CharacterCard } };
  page: number;
}

const mockStore = configureStore<RootState>();

describe('SearchResults', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      selectedItems: { selectedItems: {} },
      page: 1,
    });
    mockNavigate.mockReset();
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={[`/?page=1&search=Luke`]}>
            {ui}
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );
  };

  it('renders the specified number of cards', () => {
    renderWithProviders(<SearchResults results={mockResults} />);

    const cards = screen.getAllByRole('button');
    expect(cards).toHaveLength(mockResults.length);
  });

  it('displays appropriate message if no cards are present', () => {
    renderWithProviders(<SearchResults results={[]} />);

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  it('calls navigate with correct parameters when a card is clicked', () => {
    renderWithProviders(<SearchResults results={mockResults} />);

    const card = screen.getByText(/Luke Skywalker/i);
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/details/1?page=1&search=Luke');
  });

  it('calls toggleItem when checkbox is clicked', () => {
    store.dispatch = jest.fn();

    renderWithProviders(<SearchResults results={mockResults} />);

    const checkbox = screen.getByLabelText('Select', {
      selector: 'input[type="checkbox"]',
    });
    fireEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalledWith(toggleItem(mockResults[0]));
  });
});
