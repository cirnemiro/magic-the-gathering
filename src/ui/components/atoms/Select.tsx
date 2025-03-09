import { ChangeEvent, ComponentProps } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends ComponentProps<"select"> {
  options: Option[];
  onOptionChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function Select({
  options,
  onOptionChange,
  className = "",
  placeholder,
  label,
  ...rest
}: SelectProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (onOptionChange) {
      onOptionChange(selectedValue);
    }
  };

  return (
    <div className="flex flex-col justify-end gap-1  rounded-md">
      {label && (
        <label htmlFor={label} className="">
          {label}
        </label>
      )}
      <select
        id={label ?? ""}
        className={`p-2 border rounded-md bg-white text-gray-700 appearance-none pr-8 ${className} cursor-pointer`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'><path fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "16px",
        }}
        onChange={handleChange}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
