import { InputHTMLAttributes } from "react";
import { cn } from "../../shared/cn";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn("p-2 border border-slate-300 rounded", props.className)}
    />
  );
}
