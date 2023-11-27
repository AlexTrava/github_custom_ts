import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const instance = axios.create({
  baseURL: 'https://api.github.com/users/', 
  timeout: 5000,
});

export type  FetchApiGithub = {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  site_admin: boolean,
  name: string | null,
  company: string |null,
  blog: string,
  location: string | null,
  email: string | null,
  hireable: string | null,
  bio: string | null,
  twitter_username: string | null,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
  created_at: string,
  updated_at: string,
}

export type Items = {
  avatar: string,
  userName: string,
  name: string,
  follower: number,
  following: number,
  repos: number,
  url: string,
}

export type State = {
  items: Items[],
  status:string,
}

export const fetchUser = createAsyncThunk(
  "fetch/fetchUserInfo",
  async (searchValue:string) => {
    const { data }  = await instance.get<FetchApiGithub>(
      searchValue
    );
    return data;
  }
);



const initialState = {
  items: [],
  status: "loading", //loading, error, succes
} as State;

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchUser.pending, (state: RootState) => {
      state.status = "loading";
      state.items = [];
    });

    builder.addCase(fetchUser.fulfilled, (state: RootState, action) => {
    state.items = {
        avatar: action.payload.avatar_url,
        userName: action.payload.login,
        name: action.payload.name,
        follower: action.payload.followers,
        following: action.payload.following,
        repos: action.payload.public_repos,
        url: action.payload.html_url,
      };
      state.status = "succes";
    });

    builder.addCase(fetchUser.rejected, (state: RootState) => {
      state.status = "error";
      state.items = [];
    })
  },
});

export default fetchSlice.reducer;
