import { cn } from "@/shared/cn";
import { ArrowIcon } from "@/shared/ui/icons";

export function ToggleIcon({ isOpen }: { isOpen?: boolean }) {
  return (
    <div
      className={cn(
        `-ml-1 cursor-pointer border border-transparent rounded border-b-2 border-transparent `,
        {
          "rotate-180": isOpen,
        },
      )}
    >
      <ArrowIcon />
    </div>
  );
}
