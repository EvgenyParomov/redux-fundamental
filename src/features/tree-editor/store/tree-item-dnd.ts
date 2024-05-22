import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TreeItemId, TreeViewId } from "../model/types";

type TreeItemDnd = {
  draggingItemId?: TreeItemId;
  dragOverItemId?: TreeItemId;
  treeViewId?: TreeViewId;
};

const initialState: TreeItemDnd = {};

export const treeItemDndSlice = createSlice({
  name: "treeItemDnd",
  initialState,
  reducers: {
    dragStarted: (state, action: PayloadAction<TreeItemId>) => {
      state.draggingItemId = action.payload;
    },
    dragEnded: (state) => {
      state.draggingItemId = undefined;
    },
    dragOver: (
      state,
      action: PayloadAction<{ treeItemId: TreeItemId; treeViewId: TreeViewId }>,
    ) => {
      state.dragOverItemId = action.payload.treeItemId;
      state.treeViewId = action.payload.treeViewId;
    },
  },

  selectors: {
    draggingTreeItemId: (state) => state.draggingItemId,
    dragOverTreeItemId: (state) => state.dragOverItemId,
    dragOver: (state, treeViewId: TreeViewId, itemId: TreeItemId) =>
      state.draggingItemId
        ? state.dragOverItemId === itemId && state.treeViewId === treeViewId
        : false,
  },
});
