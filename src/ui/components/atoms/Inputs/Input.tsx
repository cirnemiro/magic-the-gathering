import React, { InputHTMLAttributes, forwardRef } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  variant?: "primary" | "secondary" | "ghost";
  value: string;
  placeholder: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      errorMessage,
      variant = "primary",
      value,
      className,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const borderClass =
      variant === "ghost"
        ? ""
        : errorMessage
        ? "border-red-500"
        : "border-gray-300";

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={rest.id} className="text-sm">
            {label}
          </label>
        )}
        <input
          value={value}
          placeholder={placeholder}
          ref={ref}
          className={`p-2 rounded-md ${borderClass} ${className}`}
          {...rest}
        />
        {errorMessage && (
          <span className="text-red-500 text-xs">{errorMessage}</span>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
