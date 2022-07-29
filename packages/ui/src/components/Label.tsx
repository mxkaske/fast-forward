import * as React from "react";
import cn from "classnames";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  return (
    <label
      className={cn(
        "block text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-1",
        className
      )}
      {...props}
    />
  );
};

export default Label;
