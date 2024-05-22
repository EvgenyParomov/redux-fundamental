import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TreeId, TreeItemFormState, TreeItemId } from "../model/types";

type TreeItemModalState =
  | {
      type: "closed";
    }
  | TreeItemFormState;

const initialState: TreeItemModalState = {
  type: "closed",
};

export const treeItemModalSlice = createSlice({
  name: "treeItemModal",
  initialState: initialState as TreeItemModalState,
  selectors: {
    state: (state) => state,
  },
  reducers: {
    treeItemEditStarted: (
      _,
      action: PayloadAction<{ treeItemId: TreeItemId; treeId: TreeId }>,
    ) => {
      return {
        type: "edit",
        editTreeItemId: action.payload.treeItemId,
        treeId: action.payload.treeId,
      };
    },
    treeItemCreateStarted: (
      _,
      action: PayloadAction<{
        parentId?: TreeItemId;
        treeId: TreeId;
      }>,
    ) => {
      return {
        type: "create",
        parentId: action.payload.parentId,
        treeId: action.payload.treeId,
      };
    },

    treeItemModalClosed: (_) => {
      return {
        type: "closed",
      };
    },
  },
});
