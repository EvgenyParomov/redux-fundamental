import {
  treeItemModalSlice,
  treeViewSlice,
  treeSlice,
  treeItemDndSlice,
} from "@/features/tree-editor";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineSlices(
  treeItemDndSlice,
  treeViewSlice,
  treeSlice,
  treeItemModalSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});
