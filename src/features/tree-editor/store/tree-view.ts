import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { TreeItemId, TreeView, TreeViewId } from "../model/types";

type TreeViewState = {
  trees: Record<TreeViewId, TreeView | undefined>;
};

const createTreeView = (): TreeView => {
  return {
    query: "",
    sort: "",
    openTreeItems: {},
  };
};

const initialState: TreeViewState = {
  trees: {},
};

const selectTreeView = createSelector(
  (state: TreeViewState) => state.trees,
  (_: TreeViewState, treeViewId: TreeViewId) => treeViewId,
  (trees, treeViewId) => trees[treeViewId] ?? createTreeView(),
);

export const treeViewSlice = createSlice({
  name: "treeItemsView",
  initialState: initialState,
  selectors: {
    selectTreeView,
    canViewChildren: createSelector(
      selectTreeView,
      (_: TreeViewState, __: TreeViewId, treeItemId: TreeItemId) => treeItemId,
      (treeView, treeItemId) => {
        return treeView.openTreeItems[treeItemId] ?? false;
      },
    ),
    sort: (state, treeViewId: TreeViewId) => {
      return state.trees[treeViewId]?.sort ?? createTreeView().sort;
    },
    query: (state, treeViewId: TreeViewId) => {
      return state.trees[treeViewId]?.query ?? createTreeView().query;
    },
  },
  reducers: {
    treeItemToggled: (
      state,
      action: PayloadAction<{
        treeViewId: TreeViewId;
        treeItemId: TreeItemId;
      }>,
    ) => {
      const tree = state.trees[action.payload.treeViewId];

      if (!tree) {
        const newTree = createTreeView();

        newTree.openTreeItems[action.payload.treeItemId] = true;
        state.trees[action.payload.treeViewId] = newTree;
      } else {
        tree.openTreeItems[action.payload.treeItemId] =
          !tree.openTreeItems[action.payload.treeItemId];
      }
    },

    treeItemsSorted: (
      state,
      action: PayloadAction<{
        treeViewId: TreeViewId;
        sort: "asc" | "desc" | "";
      }>,
    ) => {
      const tree = state.trees[action.payload.treeViewId];

      if (!tree) {
        const newTree = createTreeView();

        newTree.sort = action.payload.sort;
        state.trees[action.payload.treeViewId] = newTree;
      } else {
        tree.sort = action.payload.sort;
      }
    },

    treeItemsFiltered: (
      state,
      action: PayloadAction<{
        treeViewId: TreeViewId;
        query: string;
      }>,
    ) => {
      const tree = state.trees[action.payload.treeViewId];

      if (!tree) {
        const newTree = createTreeView();

        newTree.query = action.payload.query;
        state.trees[action.payload.treeViewId] = newTree;
      } else {
        tree.query = action.payload.query;
      }
    },
  },
});
