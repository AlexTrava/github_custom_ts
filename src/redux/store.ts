import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slices/searchSlice";
import fetchSlice from "./slices/fetchSlice";
import fetchRepoSlice from "./slices/fetchRepoSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    fetch: fetchSlice,
    fetchRepo: fetchRepoSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default RootState;
