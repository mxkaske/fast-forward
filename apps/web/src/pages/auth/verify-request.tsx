import DefaultLayout from "@/components/layout/DefaultLayout";
import { Heading } from "@fast-forward/ui";
import React from "react";

const VerifyRequest = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-xl my-16 space-y-6 text-center">
        <Heading as="h2">Check your inbox</Heading>
        <div className="text-gray-600 dark:text-gray-400">
          <p>
            An email has been send to the entered email address and is valid for
            10 min.
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VerifyRequest;
