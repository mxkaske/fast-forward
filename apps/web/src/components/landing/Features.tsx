import { Heading, Text } from "@fast-forward/ui";
import { allFeatures } from "contentlayer/generated";
import Link from "next/link";
import React from "react";
import IconBg from "../ui/IconBg";

const Features = () => {
  return (
    <div>
      <Heading className="text-center">Features</Heading>
      <div className="mt-6 grid md:grid-cols-2 gap-6 md:gap-12">
        {allFeatures
          .sort((a, b) => a.path.order - b.path.order)
          .map(({ emoji, title, excerpt, path }) => (
            <Link key={title} href={path.url}>
              <a className="group p-3 -mx-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500">
                <IconBg>{emoji}</IconBg>
                <Heading as="h3">{title}</Heading>
                <Text
                  variant="description"
                  className="group-hover:text-gray-800 dark:group-hover:text-gray-200"
                >
                  {excerpt}
                </Text>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Features;
