import { cn } from "@/shared/cn";

export function DragOverIndicator() {
  return (
    <div
      className={cn("absolute left-0 right-0 top-0  h-0.5 bg-blue-500 z-20")}
    />
  );
}
