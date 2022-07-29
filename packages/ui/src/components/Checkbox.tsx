import React, { InputHTMLAttributes } from "react";
import cn from "classnames";

const styles = {
  base: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded",
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = ({
  type = "checkbox",
  className,
  label,
  name,
  ...props
}: Props) => {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          type={type}
          name={name}
          id={name}
          className={cn(styles.base, className)}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={name}
          className="font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
