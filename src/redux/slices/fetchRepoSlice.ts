import { createAsyncThunk, createSlice, PayloadAction  } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type fetchRepo = {
id: number,
node_id: string,
name: string,
full_name: string,
private: boolean,
owner: {
login: string,
id: number,
node_id: string,
avatar_url: string,
gravatar_id: string,
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
type: string,
site_admin: boolean
},
html_url: string,
description: null | boolean,
fork: boolean,
url: string,
forks_url: string,
keys_url:string,
collaborators_url: string,
teams_url: string,
hooks_url: string,
issue_events_url: string,
events_url: string,
assignees_url: string,
branches_url: string,
tags_url: string,
blobs_url: string,
git_tags_url: string,
git_refs_url: string,
trees_url: string,
statuses_url: string,
languages_url:string,
stargazers_url: string,
contributors_url: string,
subscribers_url: string,
subscription_url: string,
commits_url: string,
git_commits_url: string,
comments_url: string,
issue_comment_url: string,
contents_url: string,
compare_url: string,
merges_url: string,
archive_url: string,
downloads_url: string,
issues_url: string,
pulls_url: string,
milestones_url: string,
notifications_url: string,
labels_url: string,
releases_url: string,
deployments_url: string,
created_at: string,
updated_at: string,
pushed_at: string,
git_url: string,
ssh_url: string,
clone_url: string,
svn_url: string,
homepage: null | boolean,
size: number,
stargazers_count: number,
watchers_count: number,
language: string,
has_issues: boolean,
has_projects: boolean,
has_downloads: boolean,
has_wiki: boolean,
has_pages: boolean,
has_discussions: boolean,
forks_count: number,
mirror_url: null | boolean,
archived: boolean,
disabled: boolean,
open_issues_count: number,
license: null | boolean,
allow_forking: boolean,
is_template: boolean,
web_commit_signoff_required: boolean,
topics: string[],
visibility: string,
forks: number,
open_issues: number,
watchers: number,
default_branch: string
}

export type fetchRepoResponce = {
  name: string;
  description?: string;
  html_url: string;
  id: number;
};

export type StateRepo = {
  items:fetchRepoResponce[],
  status:string,
}

export const fetchRepo = createAsyncThunk(
  "fetchRepo/fetchRepoInfo",
  async (searchValue:string) => {
    const { data } = await axios.get<fetchRepo>(
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
} as StateRepo;

const fetchRepoSlice = createSlice({
  name: "fetchRepos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchRepo.pending, (state: RootState) => {
      state.status = "loading";
      state.items = [];
    });

    builder.addCase(fetchRepo.fulfilled, (state: RootState, action:PayloadAction) => {
      state.items = action.payload;
      state.status = "succes";
    });

    builder.addCase(fetchRepo.rejected, (state: RootState) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export default fetchRepoSlice.reducer;
