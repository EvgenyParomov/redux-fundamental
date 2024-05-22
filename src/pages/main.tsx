import { TreeEditor } from "@/features/tree-editor";

export function MainPage() {
  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-3xl p-4 ">Tree editor</h1>
      <div className="grid grid-cols-2 gap-4">
        <TreeEditor treeViewId="main" treeId="1" />
        <TreeEditor treeViewId="second" treeId="1" />
      </div>
    </div>
  );
}
