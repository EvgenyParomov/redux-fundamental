import { AddButton, DeleteButton } from "@/shared/ui/buttons";
import { TreeItem } from "./ui/tree-item";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";

export function TreeEditor() {
  return (
    <div>
      <div className="grid grid-cols-[auto,1fr,1fr] mb-2 gap-2">
        <AddButton className="text-4xl" />
        <Input placeholder="Search..." />
        <Select placeholder="Sort by">
          <option value="name-asc">Name asc</option>
          <option value="name-desc">Name desc</option>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <TreeItem
          indent={0}
          hasToggle
          isOpen
          actions={
            <>
              <AddButton />
              <DeleteButton />
            </>
          }
        >
          Directory
        </TreeItem>
        <TreeItem indent={1}>index.ts</TreeItem>
        <TreeItem indent={1}>index.css</TreeItem>
      </div>
    </div>
  );
}
