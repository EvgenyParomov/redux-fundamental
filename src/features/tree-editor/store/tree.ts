import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Tree, TreeId, TreeItem, TreeItemId } from "../model/types";
import { itemCompareQuery } from "../model/filtres";

type TreeState = {
  treeItems: Record<TreeItemId, TreeItem | undefined>;
  trees: Record<TreeId, Tree | undefined>;
};

const initialState: TreeState = {
  trees: {
    ["1"]: {
      id: "1",
      children: ["2", "4", "5"],
    },
  },
  treeItems: {
    ["2"]: {
      id: "2",
      name: "My tree item 2",
      children: ["3"],
      treeId: "1",
    },
    ["3"]: {
      id: "3",
      name: "My tree item 3",
      treeId: "1",
      parentId: "2",
      children: ["6"],
    },
    "6": {
      id: "6",
      name: "My tree item 6",
      treeId: "1",
      parentId: "3",
      children: [],
    },
    ["4"]: {
      id: "4",
      name: "My tree item 4",
      treeId: "1",
      children: [],
    },

    ["5"]: {
      id: "5",
      name: "My tree item 5",
      treeId: "1",
      children: [],
    },
  },
};

export const createTree = (id: TreeId): Tree => {
  return {
    id,
    children: [],
  };
};

const selectFilteredChildren = createSelector(
  (state: TreeState) => state,
  (_: TreeState, childrenIds?: TreeItemId[]) => childrenIds,
  (_: TreeState, __?: TreeItemId[], query?: string) => query,
  (state, childrenIds, query): TreeItem[] => {
    return childrenIds
      ? childrenIds
          .map((id) => state.treeItems[id])
          .filter((value): value is TreeItem => !!value)
          .filter(
            (item) =>
              itemCompareQuery(item, query) ||
              selectFilteredChildren(state, item.children, query).length > 0,
          )
      : [];
  },
);

export const treeSlice = createSlice({
  name: "treeSlice",
  initialState,
  selectors: {
    selectTree: (state, treeId: TreeId) => state.trees[treeId],
    selectItem: (state, treeItemId: TreeItemId) => state.treeItems[treeItemId],
    selectFilteredChildren,
  },
  reducers: {
    treeItemCreated: (state, action: PayloadAction<TreeItem>) => {
      const parentOrRoot = action.payload.parentId
        ? state.treeItems[action.payload.parentId]
        : state.trees[action.payload.treeId];

      if (parentOrRoot) {
        parentOrRoot.children.push(action.payload.id);
      }

      state.treeItems[action.payload.id] = action.payload;
    },

    treeItemDeleted: (state, action: PayloadAction<TreeItemId>) => {
      const item = state.treeItems[action.payload];

      if (!item) {
        return;
      }

      const parentOrRoot = item.parentId
        ? state.treeItems[item.parentId]
        : state.trees[item.treeId];

      if (parentOrRoot) {
        parentOrRoot.children.splice(parentOrRoot.children.indexOf(item.id), 1);
      }

      delete state.treeItems[action.payload];
    },

    treeItemUpdated: (
      state,
      action: PayloadAction<{ name: string; id: TreeItemId }>,
    ) => {
      const item = state.treeItems[action.payload.id];
      if (item) {
        item.name = action.payload.name;
      }
    },

    treeItemMoved: (
      state,
      action: PayloadAction<{
        id: TreeItemId;
        toParentId?: TreeItemId;
        beforeId: TreeItemId;
      }>,
    ) => {
      const item = state.treeItems[action.payload.id];
      if (!item) {
        return;
      }

      const newParentOrRoot = action.payload.toParentId
        ? state.treeItems[action.payload.toParentId]
        : state.trees[item.treeId];

      const currentParentOrRoot = item.parentId
        ? state.treeItems[item.parentId]
        : state.trees[item.treeId];

      if (currentParentOrRoot) {
        currentParentOrRoot.children.splice(
          currentParentOrRoot.children.indexOf(item.id),
          1,
        );
      }

      if (newParentOrRoot) {
        newParentOrRoot.children.splice(
          newParentOrRoot.children.indexOf(action.payload.beforeId),
          0,
          item.id,
        );
      }

      item.parentId = action.payload.toParentId;
    },
  },
});
