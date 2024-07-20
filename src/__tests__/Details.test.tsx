// src/__tests__/Details.test.tsx
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Details } from '../components/Details/Details';
import { searchItem } from '@/api';

jest.mock('@/api');

const mockCharacter = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
};

describe('Details', () => {
  beforeEach(() => {
    (searchItem as jest.Mock).mockResolvedValue(mockCharacter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders character details correctly', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/details/:id',
          element: <Details />,
        },
      ],
      {
        initialEntries: ['/details/1?page=1&search=Luke'],
      },
    );

    render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument(),
    );
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
    expect(screen.getByText('Skin color: fair')).toBeInTheDocument();
    expect(screen.getByText('Eye color: blue')).toBeInTheDocument();
    expect(screen.getByText('Birth year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
  });

  it('calls onClick when the close button is clicked', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/details/:id',
          element: <Details />,
        },
      ],
      {
        initialEntries: ['/details/1?page=1&search=Luke'],
      },
    );

    render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument(),
    );

    userEvent.click(screen.getByRole('button', { name: /Close/i }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/');
      expect(router.state.location.search).toBe('?page=1&search=Luke');
    });
  });

  it('shows a loading indicator while fetching data', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/details/:id',
          element: <Details />,
        },
      ],
      {
        initialEntries: ['/details/1?page=1&search=Luke'],
      },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
