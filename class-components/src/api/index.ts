const API_BASE_URL = 'https://swapi.dev/api/people/';
import type { SearchResult } from '../types/SearchResults';

export const fetchItems = async (
  searchTerm: string = '',
  page: number = 1,
): Promise<SearchResult> => {
  const response = await fetch(
    `${API_BASE_URL}?search=${searchTerm}&page=${page}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};
