import React from "react";
import cn from "classnames";
import { Heading } from "@fast-forward/ui";
import { allQuestions } from "contentlayer/generated";

const styles = {
  focus:
    "rounded focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500",
  open: "rounded-md border border-transparent open:border-gray-200 dark:open:border-gray-800 open:shadow",
  hover: "hover:border-gray-200 dark:hover:border-gray-800",
};

const FAQ = () => {
  return (
    <div>
      <Heading as="h2" className="text-center">
        Frequent Asked Questions
      </Heading>
      <div className="space-y-2 mt-6">
        {allQuestions.map(({ emoji, title, body, slug }) => (
          <details
            key={slug}
            className={cn("p-3 -mx-3", styles.open, styles.hover)}
          >
            <summary className={cn("font-semibold", styles.focus)}>
              {/* TODO: discuss about `emoji` */}
              {title}
            </summary>
            <div
              className="mt-3 prose dark:prose-dark max-w-none"
              dangerouslySetInnerHTML={{ __html: body.html }}
            />
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
