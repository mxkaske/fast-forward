import React, { InputHTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import Label from "./Label";

const styles = {
  base: "shadow-sm focus:ring-indigo-500 bg-transparent focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-black focus:ring-2 focus:border-gray-300 dark:focus:border-gray-700 block w-full sm:text-sm border-gray-200 hover:border-gray-300 dark:hover:border-gray-700 dark:border-gray-800 rounded-md",
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  name: string;
  srOnly?: boolean; // TODO: Make it better!
}

const Input = ({
  label,
  name,
  srOnly = false,
  className,
  type = "text",
  ...props
}: Props) => {
  return (
    <div>
      <Label htmlFor={name} className={srOnly ? "sr-only" : ""}>
        {label}
      </Label>
      <input
        type={type}
        id={name}
        name={name}
        className={cn(styles.base, className)}
        {...props}
      />
    </div>
  );
};

export default Input;
