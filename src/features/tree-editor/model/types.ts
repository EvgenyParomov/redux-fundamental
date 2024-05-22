export type TreeId = string;
export type TreeViewId = string;
export type TreeItemId = string;

export type Tree = {
  id: TreeId;
  children: TreeItemId[];
};

export type TreeItem = {
  id: TreeItemId;
  treeId: TreeId;
  name: string;
  parentId?: TreeItemId;
  children: TreeItemId[];
};

export type TreeSort = "asc" | "desc" | "";

export type TreeView = {
  query: string;
  sort: TreeSort;
  openTreeItems: Record<TreeItemId, boolean>;
};

export type TreeItemFormState =
  | {
      type: "create";
      parentId?: TreeItemId;
      treeId: TreeId;
    }
  | {
      type: "edit";
      editTreeItemId: TreeItemId;
      treeId: TreeId;
    };
