import { useAppSelector } from "@/shared/store";
import { TreeId, TreeViewId } from "../model/types";
import { treeSlice } from "../store/tree";
import { TreeItem } from "./tree-item";
import { treeViewSlice } from "../store/tree-view";
import { sortTreeItems } from "../model/filtres";

export function Tree({
  treeId,
  treeViewId,
}: {
  treeId: TreeId;
  treeViewId: TreeViewId;
}) {
  const tree = useAppSelector((state) =>
    treeSlice.selectors.selectTree(state, treeId),
  );
  const query = useAppSelector((state) =>
    treeViewSlice.selectors.query(state, treeViewId),
  );
  const items = useAppSelector((state) =>
    treeSlice.selectors.selectFilteredChildren(state, tree?.children, query),
  );
  const sort = useAppSelector((state) =>
    treeViewSlice.selectors.sort(state, treeViewId),
  );
  const sortedItems = sortTreeItems(items, sort);

  return (
    <div className="flex flex-col gap-2">
      {sortedItems.map((item) => (
        <TreeItem key={item.id} id={item.id} treeViewId={treeViewId} />
      ))}
    </div>
  );
}
