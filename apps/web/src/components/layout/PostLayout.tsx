import React, { FC } from "react";
import Footer from "../navigation/Footer";
import Header from "../navigation/Header";

const PostLayout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main
        id="__main"
        className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PostLayout;
