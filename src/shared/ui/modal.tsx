import { cn } from "../cn";

export function UiModal({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-800/10 backdrop-blur-sm transition-all flex",
      )}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">{children}</div>
      </div>
    </div>
  );
}

UiModal.Header = ({
  onClose,
  title,
}: {
  title: string;
  onClose: VoidFunction;
}) => (
  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
    <h3 className="text-xl font-semibold text-gray-900 ">{title}</h3>
    <button
      onClick={onClose}
      type="reset"
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
    >
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  </div>
);

UiModal.Content = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("p-4 md:p-5 space-y-4", className)}>{children}</div>;

UiModal.Actions = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b gap-2",
      className,
    )}
  >
    {children}
  </div>
);
