import React, { FC, HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/outline";

interface Props {
  href: string;
  children?: ReactNode;
}

const LinkContainer = ({ href, children }: Props) => {
  return (
    <Link href={href}>
      <a className="flex items-center justify-between px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500">
        {/* self-start */}
        <div className="mr-4">
          {React.Children.toArray(children).filter(
            (child) => React.isValidElement(child) && child.type === Title
          )}
          {React.Children.toArray(children).filter(
            (child) => React.isValidElement(child) && child.type === Description
          )}
        </div>
        <div>
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </div>
      </a>
    </Link>
  );
};

const Title: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  ...props
}) => {
  return <p {...props}>{children}</p>;
};

const Description: FC = ({ children }) => {
  return <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>;
};

LinkContainer.Title = Title;
LinkContainer.Description = Description;

export default LinkContainer;
