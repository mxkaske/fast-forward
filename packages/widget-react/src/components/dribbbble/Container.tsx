import * as React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-gray-light rounded-md shadow-lg p-2 bg-white">
      {children}
    </div>
  );
};

export default Container;
