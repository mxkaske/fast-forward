import * as React from "react";
import cn from "classnames";

const styles = {
  base: "mb-1",
  variant: {
    default: "",
    description: "text-sm text-gray-600 dark:text-gray-400",
  },
};

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: keyof typeof styles.variant;
}

const Text: React.FC<Props> = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  return (
    <p
      className={cn(styles.base, styles.variant[variant], className)}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
