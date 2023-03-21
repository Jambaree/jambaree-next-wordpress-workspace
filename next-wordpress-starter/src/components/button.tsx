import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;

  className?: string;
  /**
   * the variant of the button
   */
  variant?: "primary" | "secondary";

  size?: "sm" | "md" | "lg";

  /**
   * override the component type of the button (e.g. "a", "button" or "Link")
   */
  component?: React.ElementType;

  /**
   * if true, the button will be disabled and show a loading spinner
   */
  isLoading?: boolean;

  [key: string]: any;
};

export default function Button({
  children,
  className,
  variant = "primary",
  component: Component = "button",
  isLoading = false,
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <Component
      className={clsx(
        "relative flex items-center select-none justify-center gap-1 rounded-md border border-white/20 text-sm font-semibold transition duration-200 ease-in-out hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-slate-500 shadow-sm",

        variant === "primary" &&
          "bg-primary text-white hover:bg-primary/80 hover:text-white/80",

        variant === "secondary" &&
          "rounded-md bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",

        `disabled:cursor-not-allowed disabled:opacity-70`,

        size === "sm" && "px-2 py-1 text-xs md:py-2 md:px-3 md:text-sm",
        size === "md" && "py-2.5 px-3.5 text-sm md:py-3 md:px-4 md:text-base",
        size === "lg" && "px-8 py-3 text-base md:py-4 md:px-10 md:text-lg",

        className
      )}
      {...props}
    >
      {isLoading && (
        <span
          className={clsx(
            `absolute inset-0 flex items-center justify-center text-center opacity-0`,
            isLoading && `opacity-100`
          )}
        >
          <svg
            className={clsx(
              "h-5 w-5 animate-spin",
              variant === "primary" && "text-white",
              variant === "secondary" && "text-black"
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}

      <span className={clsx(isLoading && "opacity-0")}>{children}</span>
    </Component>
  );
}
