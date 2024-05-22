import { InputHTMLAttributes } from "react";
import { cn } from "@/shared/cn";

export function UiSelect(props: InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn("p-2 border border-slate-300 rounded", props.className)}
    />
  );
}
