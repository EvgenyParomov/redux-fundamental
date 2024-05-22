import { TreeItemId, TreeViewId } from "../model/types";
import { useAppSelector } from "@/shared/store";
import { treeSlice } from "../store/tree";
import { treeViewSlice } from "../store/tree-view";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ItemLayout } from "./views/item-layout";
import { ButtonWithActions } from "./views/button-with-actions";
import { ToggleIcon } from "./views/toggle-icon";
import { TreeItemActions } from "./tree-item-actions";
import { treeItemDndSlice } from "../store/tree-item-dnd";
import { DragOverIndicator } from "./views/drag-over-indicator";
import { itemCompareQuery, sortTreeItems } from "../model/filtres";

export function TreeItem({
  id,
  treeViewId,
}: {
  id: TreeItemId;
  treeViewId: TreeViewId;
}) {
  const dispatch = useDispatch();
  const draggingTreeItemId = useAppSelector(
    treeItemDndSlice.selectors.draggingTreeItemId,
  );
  const dragOverTreeItemId = useAppSelector(
    treeItemDndSlice.selectors.dragOverTreeItemId,
  );
  const dragOver = useAppSelector((state) =>
    treeItemDndSlice.selectors.dragOver(state, treeViewId, id),
  );
  const treeViewActions = bindActionCreators(treeViewSlice.actions, dispatch);
  const treeSliceActions = bindActionCreators(treeSlice.actions, dispatch);
  const treeItemDndActions = bindActionCreators(
    treeItemDndSlice.actions,
    dispatch,
  );

  const item = useAppSelector((state) =>
    treeSlice.selectors.selectItem(state, id),
  );

  const query = useAppSelector((state) =>
    treeViewSlice.selectors.query(state, treeViewId),
  );

  const sort = useAppSelector((state) =>
    treeViewSlice.selectors.sort(state, treeViewId),
  );

  const children = useAppSelector((state) =>
    treeSlice.selectors.selectFilteredChildren(state, item?.children, query),
  );

  const sortedChildren = sortTreeItems(children, sort);

  const hasChildren = children.length > 0;

  const canViewChildren =
    useAppSelector((state) =>
      treeViewSlice.selectors.canViewChildren(state, treeViewId, id),
    ) || !!query;

  if (!item) {
    return null;
  }

  const compareQuery = !!query && itemCompareQuery(item, query);

  return (
    <ItemLayout
      button={
        <ButtonWithActions
          selected={compareQuery}
          text={item.name}
          prefix={hasChildren && <ToggleIcon isOpen={canViewChildren} />}
          actions={<TreeItemActions item={item} />}
          buttonProps={{
            onDragStart: (e) => {
              e.dataTransfer.setData("text/plain", item.id);
              treeItemDndActions.dragStarted(item.id);
            },
            onDragEnd: () => {
              treeItemDndActions.dragEnded();
            },
            onDrop: (e) => {
              e.preventDefault();
              console.log("drop");
              treeSliceActions.treeItemMoved({
                id: draggingTreeItemId ?? "",
                beforeId: item.id,
                toParentId: item.parentId,
              });
            },
            onDragOver: (e) => {
              e.preventDefault();
              if (dragOverTreeItemId !== item.id) {
                treeItemDndActions.dragOver({
                  treeViewId,
                  treeItemId: item.id,
                });
              }
            },
            onClick: () =>
              treeViewActions.treeItemToggled({
                treeViewId,
                treeItemId: item.id,
              }),
            draggable: true,
          }}
          decoration={dragOver && <DragOverIndicator />}
        />
      }
      children={
        canViewChildren &&
        draggingTreeItemId !== item.id &&
        sortedChildren.map((item) => (
          <TreeItem key={item.id} id={item.id} treeViewId={treeViewId} />
        ))
      }
    />
  );
}
