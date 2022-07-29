import cn from "classnames";
import React, { FC, HTMLAttributes } from "react";

const Divider: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-gray-500">{children}</span>
      </div>
    </div>
  );
};

export default Divider;
