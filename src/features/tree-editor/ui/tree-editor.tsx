import { TreeItemModal } from "./tree-item-modal";
import { TreeId, TreeViewId } from "../model/types";
import { Tree } from "./tree";
import { TreeToolbar } from "./tree-toolbar";

export function TreeEditor({
  treeId,
  treeViewId,
}: {
  treeId: TreeId;
  treeViewId: TreeViewId;
}) {
  return (
    <div className="flex flex-col gap-2">
      <TreeToolbar treeId={treeId} treeViewId={treeViewId} />
      <Tree treeId={treeId} treeViewId={treeViewId} />
      <TreeItemModal />
    </div>
  );
}
