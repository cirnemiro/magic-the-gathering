import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      className,
      disabled,
      children,
      ...rest
    },
    ref
  ) => {
    const baseClasses =
      "py-2 px-4 rounded focus:outline-none transition-all cursor-pointer disabled:cursor-not-allowed";
    const variantClasses = disabled
      ? "bg-gray-400 text-gray-200"
      : variant === "primary"
      ? "bg-blue-500 text-white"
      : "bg-red-700 text-white";
    const sizeClasses =
      size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-base";

    const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

    return (
      <button ref={ref} className={buttonClasses} disabled={disabled} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
