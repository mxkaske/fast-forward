import React, { SVGProps } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { Button } from "@fast-forward/ui";

interface Props {
  onClick: () => void;
  title: string;
  description: string;
  buttonTitle: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

const EmptyState = ({
  onClick,
  title,
  description,
  buttonTitle,
  icon,
}: Props) => {
  const Icon = icon;
  return (
    <div className="text-center">
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6">
        <Button
          onClick={onClick}
          className="inline-flex items-center"
          variant="primary"
        >
          <PlusIcon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};
export default EmptyState;
