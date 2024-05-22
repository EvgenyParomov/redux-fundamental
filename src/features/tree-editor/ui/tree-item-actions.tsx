import { UiIconButton } from "@/shared/ui/buttons";
import { TreeItem } from "../model/types";
import { AddIcon, DeleteIcon, EditIcon } from "@/shared/ui/icons";
import { bindActionCreators } from "@reduxjs/toolkit";
import { treeItemModalSlice } from "../store/tree-item-modal";
import { useAppDispatch } from "@/shared/store";
import { treeSlice } from "../store/tree";

export function TreeItemActions({ item }: { item: TreeItem }) {
  const treeModalActions = bindActionCreators(
    treeItemModalSlice.actions,
    useAppDispatch(),
  );

  const treeActions = bindActionCreators(treeSlice.actions, useAppDispatch());
  return (
    <>
      <UiIconButton
        onClick={() =>
          treeModalActions.treeItemCreateStarted({
            parentId: item.id,
            treeId: item.treeId,
          })
        }
      >
        <AddIcon />
      </UiIconButton>
      <UiIconButton
        onClick={() =>
          treeModalActions.treeItemEditStarted({
            treeItemId: item.id,
            treeId: item.treeId,
          })
        }
      >
        <EditIcon />
      </UiIconButton>
      <UiIconButton
        variant="danger"
        onClick={() => treeActions.treeItemDeleted(item.id)}
      >
        <DeleteIcon />
      </UiIconButton>
    </>
  );
}
