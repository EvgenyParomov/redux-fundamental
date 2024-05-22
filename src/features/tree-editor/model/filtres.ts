import { TreeItem, TreeSort } from "./types";

export const sortTreeItems = (items: TreeItem[], sort: TreeSort) =>
  items.toSorted((a, b) => {
    if (sort === "") {
      return 0;
    }
    if (sort === "asc") {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });

export const itemCompareQuery = (item: TreeItem, query: string = "") => {
  if (!query) {
    return true;
  }

  return item.name.toLowerCase().includes(query.toLowerCase());
};
