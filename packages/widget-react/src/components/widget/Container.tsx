import * as React from "react";
import PoweredBy from "./PoweredBy";
import { useFFContext } from "./Provider";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { state } = useFFContext();
  return (
    <div className="border border-gray-light rounded-md shadow-lg p-2 bg-white">
      {children}
      {state !== "success" ? <PoweredBy /> : undefined}
    </div>
  );
};

export default Container;
