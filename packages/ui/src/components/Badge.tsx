import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

const styles = {
  base: "inline-flex items-center rounded-full",
  color: {
    default: "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
    primary:
      "bg-indigo-200 dark:bg-pink-700 text-indigo-800 dark:text-pink-100",
    secondary: "bg-yellow-200 text-yellow-800",
    ternary: "bg-red-200 text-red-800",
    quantery: "bg-lime-200 text-lime-800",
  },
  size: {
    sm: "px-2 py-0.5 text-xs font-light",
    md: "px-2.5 py-0.5 text-sm font-medium",
  },
};

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color?: keyof typeof styles.color;
  size?: keyof typeof styles.size;
}

const Badge: FC<Props> = ({
  children,
  className,
  color = "default",
  size = "md",
}) => {
  const rootClassName = cn(
    styles.base,
    styles.color[color],
    styles.size[size],
    className
  );
  return <span className={rootClassName}>{children}</span>;
};

export default Badge;
