import { ArrowIcon } from "./icons";

export function TreeItem({
  children,
  actions,
  indent = 0,
  onToggle,
  hasToggle = false,
}: {
  children?: React.ReactNode;
  actions?: React.ReactNode;
  onToggle?: () => void;
  isOpen?: boolean;
  hasToggle?: boolean;
  indent?: number;
}) {
  return (
    <div
      className="p-2 px-3 rounded border border-gray-300 flex gap-1 items-center relative text-lg"
      style={{ marginLeft: indent * 20 }}
    >
      {hasToggle && (
        <>
          <div
            className={`-ml-1 cursor-pointer border border-transparent rounded`}
          >
            <ArrowIcon />
          </div>
        </>
      )}
      {children}
      <button
        className="absolute inset-0 [&:hover+*]:opacity-100"
        onClick={onToggle}
      >
        <span className="sr-only">toggle {children}</span>
      </button>
      <div className="opacity-0 hover:opacity-100 relative z-10  ml-auto flex gap-1">
        {actions}
      </div>
    </div>
  );
}
