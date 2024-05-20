import { ButtonHTMLAttributes } from "react";
import { AddIcon, DeleteIcon } from "./icons";
import { cn } from "../../shared/cn";

export function AddButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "text-blue-500 hover:text-blue-400 transition-colors text-2xl",
        props.className,
      )}
    >
      <AddIcon />
    </button>
  );
}

export function DeleteButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "text-red-500 hover:text-red-400 transition-colors text-2xl",
        props.className,
      )}
    >
      <DeleteIcon />
    </button>
  );
}
