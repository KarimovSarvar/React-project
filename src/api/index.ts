import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchResult, CharacterCard } from '../types/SearchResults';

const API_BASE_URL = 'https://swapi.dev/api/people/';

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
