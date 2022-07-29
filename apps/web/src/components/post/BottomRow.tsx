import { ChevronLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { FC } from "react";
import { Badge, Divider } from "@fast-forward/ui";

const tags = [
  "default",
  "primary",
  "secondary",
  "ternary",
  "quantery",
] as const;

const BottomRow: FC = () => {
  return (
    <div className="pt-6 block xl:hidden">
      <div className="flex flex-col items-center">
        <p className="text-xs leading-5 tracking-wide uppercase text-gray-500 pb-2">
          Defined Tags
        </p>
        <div className="flex flex-wrap">
          {tags.map((i) => (
            <Badge key={i} color={i} className="mr-2 mb-1">
              {i}
            </Badge>
          ))}
        </div>
      </div>
      <Divider className="py-6" />
      <Link href="/blog">
        <a className="flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300">
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          go back
        </a>
      </Link>
    </div>
  );
};

export default BottomRow;
