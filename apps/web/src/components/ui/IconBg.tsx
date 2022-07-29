import React from "react";

const IconBg = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-max p-2 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="h-5 w-5 text-center text-sm leading-normal">
        {children}
      </div>
    </div>
  );
};

export default IconBg;
