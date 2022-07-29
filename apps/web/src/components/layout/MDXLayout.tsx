import React, { FC } from "react";
import DefaultLayout from "./DefaultLayout";

const MDXLayout: FC = ({ children }) => {
  return (
    <DefaultLayout>
      <div className="mt-6 prose dark:prose-dark prose-lg">{children}</div>
    </DefaultLayout>
  );
};

export default MDXLayout;
