import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, CSSProperties, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const BRAND_GRADIENT: CSSProperties = {
  background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #67e8f9 100%)",
  color: "#3b0764",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:  "hover:opacity-90 shadow-md",
  secondary:"bg-gray-900 text-white hover:bg-gray-700",
  outline:  "border-2 border-gray-200 text-gray-700 hover:border-violet-400 hover:text-violet-700 bg-white",
  ghost:    "text-gray-700 hover:bg-gray-100",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      className,
      style,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isPrimary = variant === "primary";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={{
          ...(isPrimary ? BRAND_GRADIENT : {}),
          ...style,
        }}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
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
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
