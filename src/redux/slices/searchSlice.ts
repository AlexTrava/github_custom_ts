import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type SearchState = {
  searchValue: string;
};

const initialState = {
  searchValue: "",
} as SearchState;

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state: RootState, action: PayloadAction) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
