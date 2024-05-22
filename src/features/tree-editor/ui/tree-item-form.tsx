import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { UiButton } from "@/shared/ui/buttons";
import { useAppSelector } from "@/shared/store";
import { UiInput } from "@/shared/ui/input";
import { useId } from "react";
import { bindActionCreators, nanoid } from "@reduxjs/toolkit";
import { treeSlice } from "../store/tree";
import { useDispatch } from "react-redux";
import { TreeId, TreeItemId } from "../model/types";

type FormData = {
  name: string;
};

export function TreeItemForm({
  onSubmit,
  children,
  mode,
}: {
  onSubmit: () => void;
  children: React.ReactNode;
  mode:
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
}) {
  const dispatch = useDispatch();

  const treeSliceActions = bindActionCreators(treeSlice.actions, dispatch);

  const treeItem = useAppSelector((state) =>
    mode.type === "edit"
      ? treeSlice.selectors.selectItem(state, mode.editTreeItemId)
      : undefined,
  );

  const form = useForm<FormData>({
    defaultValues: {
      name: treeItem?.name ?? "",
    },
  });

  const submit = (data: FormData) => {
    if (mode.type === "edit") {
      treeSliceActions.treeItemUpdated({
        id: mode.editTreeItemId,
        name: data.name,
      });
    }

    if (mode.type === "create") {
      treeSliceActions.treeItemCreated({
        name: data.name,
        parentId: mode.parentId,
        treeId: mode.treeId,
        id: nanoid(),
        children: [],
      });
    }
    form.reset();
    onSubmit();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)}>{children}</form>{" "}
    </FormProvider>
  );
}

TreeItemForm.Fields = function Fields() {
  const form = useFormContext<FormData>();

  const inputId = useId();

  return (
    <div>
      <label htmlFor={inputId} className="block mb-2">
        Name
      </label>
      <UiInput id={inputId} className="w-full" {...form.register("name")} />
    </div>
  );
};

TreeItemForm.Submit = () => {
  return <UiButton type="submit">Save</UiButton>;
};
