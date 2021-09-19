import React from "react";
import Widget from "./Widget";
import { ChatAlt2Icon } from "@heroicons/react/outline";
import feebackConfig from "../../fast-feedback.json";

const WidgetFABExample = () => {
  return (
    <div className="fixed bottom-4 left-8">
      <Widget projectId={feebackConfig.projects.main}>
        <button className="inline-flex rounded-full shadow-lg bg-white hover:bg-indigo-500 border text-indigo-500 hover:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium">
          Give us feedback
          <ChatAlt2Icon className="ml-2 h-6 w-6 text-pink-500 " />
        </button>
      </Widget>
    </div>
  );
};

export default WidgetFABExample;