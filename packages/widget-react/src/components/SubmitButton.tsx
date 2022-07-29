import * as React from "react";
import cn from "classnames";

const styles = {
  base: "w-full sm:text-lg rounded-md px-1 py-1 bg-transparent",
  focus: "focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary",
  active: "!text-theme-inverted !bg-theme-primary", // needs !important - otherwise will be overwritten
  disabled: "pointer-events-none text-theme-base bg-theme-button",
};

const SubmitButton = ({
  children,
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const rootClassName = cn(
    styles.base,
    styles.focus,
    disabled ? styles.disabled : styles.active,
    className
  );
  return (
    <button
      type="submit"
      className={rootClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
