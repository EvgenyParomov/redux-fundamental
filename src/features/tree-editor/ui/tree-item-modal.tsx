import { useAppSelector } from "@/shared/store";
import { UiButton } from "@/shared/ui/buttons";
import { UiModal } from "@/shared/ui/modal";
import { treeItemModalSlice } from "../store/tree-item-modal";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TreeItemForm } from "./tree-item-form";

export function TreeItemModal() {
  const dispatch = useDispatch();

  const modalSliceActions = bindActionCreators(
    treeItemModalSlice.actions,
    dispatch,
  );

  const modalState = useAppSelector(treeItemModalSlice.selectors.state);

  const handleClose = () => {
    modalSliceActions.treeItemModalClosed();
  };

  if (modalState.type === "closed") {
    return null;
  }

  return (
    <UiModal>
      <TreeItemForm mode={modalState} onSubmit={handleClose}>
        <UiModal.Header
          title={modalState.type === "edit" ? "Edit item" : "Add item"}
          onClose={handleClose}
        />
        <UiModal.Content>
          <TreeItemForm.Fields />
        </UiModal.Content>
        <UiModal.Actions>
          <UiButton variant="danger" onClick={handleClose}>
            Cancel
          </UiButton>
          <TreeItemForm.Submit />
        </UiModal.Actions>
      </TreeItemForm>
    </UiModal>
  );
}
