import * as React from "react";
import cn from "classnames";

const styles = {
  base: "inline-flex items-center border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 rounded-md cursor-pointer focus:outline-none",
  // FIXME: styles not applied
  checked:
    "peer-checked:bg-gray-900 dark:peer-checked:bg-gray-800 peer-checked:text-white",
  focus: "peer-focus:ring-gray-900 peer-focus:ring-2 peer-focus:ring-offset-2",
  size: {
    sm: "py-1 px-2 text-sm",
    md: "px-3 py-2",
  },
};

export interface RadioCardProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  containerClassName?: string;
  size?: keyof typeof styles.size;
  id: string; // needs to be required!
}

const RadioCard = ({
  children,
  className,
  id,
  containerClassName,
  size = "md",
  type = "radio",
  ...props
}: RadioCardProps) => {
  return (
    <div className={containerClassName}>
      <input className={"sr-only peer"} {...{ type, id, ...props }} />
      <label
        htmlFor={id}
        className={cn(
          styles.base,
          styles.checked,
          styles.size[size],
          styles.focus,
          className
        )}
      >
        {children}
      </label>
    </div>
  );
};

export default RadioCard;
