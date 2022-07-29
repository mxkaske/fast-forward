import React, { ReactNode, TextareaHTMLAttributes } from "react";
import cn from "classnames";
import Label from "./Label";

const styles = {
  base: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-100 dark:border-gray-900 rounded-md bg-transparent",
};

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: ReactNode;
  name: string;
  srOnly?: boolean;
}

const TextArea = ({
  label,
  name,
  className,
  srOnly = false,
  ...props
}: Props) => {
  return (
    <div>
      <Label htmlFor={name} className={srOnly ? "sr-only" : ""}>
        {label}
      </Label>
      <textarea
        id={name}
        name={name}
        className={cn(styles.base, className)}
        {...props}
      />
    </div>
  );
};

export default TextArea;
