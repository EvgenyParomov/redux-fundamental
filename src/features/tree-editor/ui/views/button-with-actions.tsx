import { cn } from "@/shared/cn";
import { ButtonHTMLAttributes } from "react";

export function ButtonWithActions({
  actions,
  prefix,
  text,
  buttonProps,
  decoration,
  selected,
}: {
  prefix: React.ReactNode;
  actions: React.ReactNode;
  text: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  decoration?: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        "p-2 px-3 rounded border border-gray-300 flex gap-1 items-center relative text-lg",
        {
          "ring-1 ring-blue-500": selected,
        },
      )}
    >
      {prefix}
      {text}
      <button
        {...buttonProps}
        className={cn(
          "absolute inset-0 [&:hover+*]:opacity-100",
          buttonProps?.className,
        )}
      >
        <span className="sr-only">toggle {text}</span>
      </button>
      <div className="opacity-0 hover:opacity-100 relative z-10  ml-auto flex gap-1">
        {actions}
      </div>
      {decoration}
    </div>
  );
}
