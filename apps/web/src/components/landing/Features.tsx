import { Heading, Text } from "@fast-forward/ui";
import { allFeatures } from "contentlayer/generated";
import Link from "next/link";
import React from "react";
import IconBg from "../ui/IconBg";

const Features = () => {
  return (
    <div>
      <Heading className="text-center">Features</Heading>
      <div className="grid md:grid-cols-2 gap-6 md:gap-12">
        {allFeatures.map(({ emoji, title, excerpt, url }) => (
          <Link key={title} href={url}>
            <a className="p-3 -mx-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500">
              <IconBg>{emoji}</IconBg>
              <Heading as="h3">{title}</Heading>
              <Text variant="description">{excerpt}</Text>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Features;
