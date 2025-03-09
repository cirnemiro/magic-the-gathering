// components/atoms/Button.tsx
import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "medium", className, children, ...rest },
    ref
  ) => {
    const baseClasses =
      "py-2 px-4 rounded focus:outline-none transition-all cursor-pointer";
    const variantClasses =
      variant === "primary"
        ? "bg-blue-500 text-white"
        : "bg-gray-500 text-black";
    const sizeClasses =
      size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-base";

    const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

    return (
      <button ref={ref} className={buttonClasses} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
