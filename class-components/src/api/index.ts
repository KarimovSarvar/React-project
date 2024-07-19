import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchResult, CharacterCard } from '../types/SearchResults';
import { url } from 'inspector';

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

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    searchItems: builder.query<
      SearchResult,
      { searchTerm: string; page: number }
    >({
      query: ({ searchTerm, page }) => ({
        url: `?search=${searchTerm}&page=${page}`,
      }),
    }),
    searchItem: builder.query<CharacterCard, string>({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
  }),
});

export const { useSearchItemsQuery, useSearchItemQuery } = searchApi;
