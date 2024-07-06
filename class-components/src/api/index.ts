const API_BASE_URL = 'https://swapi.dev/api/people/';

export const fetchItems = async (
  searchTerm: string = '',
  page: number = 1,
): Promise<any> => {
  const response = await fetch(
    `${API_BASE_URL}?search=${searchTerm}&page=${page}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};
