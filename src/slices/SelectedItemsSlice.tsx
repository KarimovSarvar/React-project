import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CharacterCard } from '@/types/SearchResults';

interface SelectedItemsState {
  selectedItems: { [key: string]: CharacterCard };
}

const localStoreValue = localStorage.getItem('selectedItems');

const initialState: SelectedItemsState = localStoreValue
  ? { selectedItems: JSON.parse(localStoreValue) }
  : {
      selectedItems: {},
    };

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<CharacterCard>) => {
      const item = action.payload;
      const id = item.url;
      if (state.selectedItems[id]) {
        delete state.selectedItems[id];
      } else {
        state.selectedItems[id] = item;
      }
      localStorage.setItem(
        'selectedItems',
        JSON.stringify(state.selectedItems),
      );
    },
    unselectAll: (state) => {
      state.selectedItems = {};
      localStorage.removeItem('selectedItems');
    },
  },
});

export const { toggleItem, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
export type { SelectedItemsState };
