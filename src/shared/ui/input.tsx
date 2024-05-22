import { InputHTMLAttributes, Ref, forwardRef } from "react";
import { cn } from "@/shared/cn";

export const UiInput = forwardRef(function UiInput(
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn("p-2 border border-slate-300 rounded", props.className)}
    />
  );
});
