import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

const styles = {
  base: "rounded-md border dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500",
  variant: {
    none: "border-transparent dark:border-transparent hover:bg-gray-100 dark:hover:bg-gray-900",
    default: "",
    primary:
      "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700",
    danger: "dark:hover:border-red-600 hover:border-red-400 text-red-500",
    star: "text-yellow-500 border-transparent dark:hover:border-yellow-500",
  },
  size: {
    sm: "px-1 py-px",
    md: "px-2 py-1",
    lg: "px-3 py-2 md:py-[6px]",
  },
  disabled: "pointer-events-none",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styles.variant;
  size?: keyof typeof styles.size;
}

const Button: FC<Props> = ({
  children,
  variant = "default",
  size = "md",
  className,
  disabled,
  ...props
}) => {
  const rootClassName = cn(
    styles.base,
    styles.variant[variant],
    styles.size[size],
    { [styles.disabled]: disabled },
    className
  );
  return (
    <button className={rootClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
