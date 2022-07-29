import React from "react";
import { Heading } from "@fast-forward/ui";

const Snippet = () => {
  return (
    <>
      <Heading as="h2" className="text-center mb-6">
        Request Snippet
      </Heading>
      <p className="max-w-2xl mx-auto mb-4 text-gray-700 dark:text-gray-300">
        Build your own form and submit the feedback to the API endpoint. Send a
        POST request to <code>https://fast-forward.app/api/feedback</code> that
        looks like:
      </p>
      <pre className="max-w-xl mx-auto overflow-x-scroll rounded-md border shadow-md border-indigo-500 dark:border-pink-500 p-8">
        <code>
          {`fetch("https://fast-forward.app/api/feedback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    projectId: "VWJU7eJdIEYGmoyKW4rp", // mandatory
    text: "Great tool!", // mandatory
    category: "other", // mandatory - either "issue", "idea" or "other"
    userId: "maximilian@kaske.org", // optional
    metadata: {}, // optional - e.g. { lang: "en", position: "header" }
  }),
});`}
        </code>
      </pre>
    </>
  );
};

export default Snippet;
