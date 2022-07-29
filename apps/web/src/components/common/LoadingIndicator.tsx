import React from "react";
import LoadingIcon from "../icon/Loading";
import DefaultLayout from "../layout/DefaultLayout";

// TODO: create seperate loading indicator

const LoadingIndicator = () => (
  <DefaultLayout className="h-full w-full flex justify-center items-center">
    <LoadingIcon className="animate-spin -ml-1 mr-3 h-5 w-5 dark:text-gray-400 text-gray-600" />
  </DefaultLayout>
);

export default LoadingIndicator;
