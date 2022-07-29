import { ChevronLeftIcon } from "@heroicons/react/solid";
import Link from "@/components/ui/Link";
import React, { FC } from "react";
import type { Post } from "@/types/index";
import { Badge, Divider } from "@fast-forward/ui";

const tags = [
  "default",
  "primary",
  "secondary",
  "ternary",
  "quantery",
] as const;

interface Props {
  post: Post;
}

const LeftCol: FC<Props> = ({ post }) => {
  return (
    // self-start because in flexbox
    <div className="mb-4 xl:sticky top-20 self-start hidden xl:block">
      <Divider className="py-6" />
      <p className="text-xs leading-5 tracking-wide uppercase text-gray-600 dark:text-gray-400 pb-2">
        Defined Tags
      </p>
      <div className="w-full flex flex-wrap">
        {tags.map((i) => (
          <Badge key={i} color={i} className="mr-2 mb-1">
            {i}
          </Badge>
        ))}
      </div>
      <Divider className="py-6" />
      <Link href="/blog" className="inline-flex items-center">
        <ChevronLeftIcon className="h-4 w-4 mr-1" />
        go back
      </Link>
    </div>
  );
};

export default LeftCol;
