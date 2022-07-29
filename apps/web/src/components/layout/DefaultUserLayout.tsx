import React, { FC } from "react";
import Breadcrumbs, { BreadcrumbsProps } from "../navigation/Breadcrumbs";
import Footer from "../navigation/Footer";
import Header from "../navigation/Header";

interface Props extends BreadcrumbsProps {
  children?: React.ReactNode;
}

const DefaultUserLayout = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} className="min-h-screen flex flex-col">
        <Header>
          <Breadcrumbs {...props} />
        </Header>
        <main
          id="__main"
          className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0 py-6 flex-1 w-full"
        >
          {children}
        </main>
        <Footer />
      </div>
    );
  }
);

DefaultUserLayout.displayName = "DefaultUserLayout";
export default DefaultUserLayout;
