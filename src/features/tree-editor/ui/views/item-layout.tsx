import React from "react";

export function ItemLayout({
  children,
  button,
}: {
  button: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {button}
      <div className="flex gap-2 flex-col empty:hidden pl-5">{children}</div>
    </div>
  );
}
