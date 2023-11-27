import { createAsyncThunk, createSlice, PayloadAction  } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type fetchRepoResponce = {
  name: string;
  description?: string;
  html_url: string;
  id: number;
};

export const fetchRepo = createAsyncThunk(
  "fetchRepo/fetchRepoInfo",
  async (searchValue:string) => {
    const { data } = await axios.get(
      `https://api.github.com/users/${searchValue}/repos`
    );
    return data.map(
      ({ name, description, html_url, id }: fetchRepoResponce) => {
        return {
          name: name,
          description: description,
          html_url: html_url,
          id: id,
        };
      }
    );
  }
);

const initialState = {
  items: [],
  status: "loading", //loading, error, succes
};

const fetchRepoSlice = createSlice({
  name: "fetchRepos",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRepo.pending]: (state: RootState) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchRepo.fulfilled]: (state: RootState, action:PayloadAction) => {
      state.items = action.payload;
      state.status = "succes";
    },
    [fetchRepo.rejected]: (state: RootState) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export default fetchRepoSlice.reducer;
