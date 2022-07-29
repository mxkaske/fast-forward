import DefaultLayout from "@/components/layout/DefaultLayout";
import { Heading } from "@fast-forward/ui";
import React from "react";

const AuthError = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-xl my-16 space-y-6 text-center">
        <Heading as="h2">Error while authentification</Heading>
        <div className="text-gray-600 dark:text-gray-400">
          <p>Something went wrong. Please retry</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AuthError;
