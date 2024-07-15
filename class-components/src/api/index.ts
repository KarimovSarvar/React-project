import type { SearchResult, CharacterCard } from '../types/SearchResults';
const API_BASE_URL = 'https://swapi.dev/api/people/';

export async function searchItems(
  searchTerm: string,
  page: number,
): Promise<SearchResult | undefined> {
  try {
    const response = await fetch(
      `${API_BASE_URL}?search=${searchTerm}&page=${page}`,
    );
    const result: SearchResult = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function searchItem(
  id: string,
): Promise<CharacterCard | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}${id}`);
    const result: CharacterCard = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
