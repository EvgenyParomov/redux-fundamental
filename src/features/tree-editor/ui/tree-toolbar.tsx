import { UiIconButton } from "@/shared/ui/buttons";
import { AddIcon } from "@/shared/ui/icons";
import { UiInput } from "@/shared/ui/input";
import { UiSelect } from "@/shared/ui/select";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { treeViewSlice } from "../store/tree-view";
import { treeItemModalSlice } from "../store/tree-item-modal";
import { TreeId, TreeViewId } from "../model/types";
import { useAppSelector } from "@/shared/store";

export function TreeToolbar({
  treeId,
  treeViewId,
}: {
  treeId: TreeId;
  treeViewId: TreeViewId;
}) {
  const dispatch = useDispatch();

  const treeViewActions = bindActionCreators(treeViewSlice.actions, dispatch);
  const treeModalActions = bindActionCreators(
    treeItemModalSlice.actions,
    dispatch,
  );

  const query = useAppSelector((state) =>
    treeViewSlice.selectors.query(state, treeViewId),
  );
  const sort = useAppSelector((state) =>
    treeViewSlice.selectors.sort(state, treeViewId),
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    treeViewActions.treeItemsFiltered({
      treeViewId,
      query: e.target.value,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    treeViewActions.treeItemsSorted({
      treeViewId,
      sort: e.target.value as "asc" | "desc",
    });
  };

  return (
    <div className="grid grid-cols-[auto,1fr,1fr] gap-2">
      <UiIconButton
        className="text-4xl"
        onClick={() => treeModalActions.treeItemCreateStarted({ treeId })}
      >
        <AddIcon />
      </UiIconButton>
      <UiInput
        placeholder="Search..."
        value={query}
        onChange={handleQueryChange}
      />
      <UiSelect value={sort} onChange={handleSortChange} placeholder="Sort by">
        <option value=""></option>
        <option value="asc">Name asc</option>
        <option value="desc">Name desc</option>
      </UiSelect>
    </div>
  );
}
