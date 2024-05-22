import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/cn";

export function UiIconButton({
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger";
}) {
  return (
    <button
      {...props}
      className={cn(
        "transition-colors text-2xl",
        {
          "text-red-500 hover:text-red-400": variant === "danger",
          "text-blue-500 hover:text-blue-400": variant === "primary",
        },
        props.className,
      )}
    />
  );
}

export function UiButton({
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger";
}) {
  return (
    <button
      {...props}
      className={cn(
        "text-white transition-colors px-4 py-2 rounded",
        {
          "text-red-500 hover:text-red-400": variant === "danger",
          "text-blue-500 hover:text-blue-400": variant === "primary",
        },
        props.className,
      )}
    />
  );
}
