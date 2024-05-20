import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const rootReducer = combineSlices();

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
