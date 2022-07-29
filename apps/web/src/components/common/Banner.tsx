import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { Text } from "@fast-forward/ui";
import cn from "classnames";

interface Base {
  children?: React.ReactNode;
}

interface Props extends Base {
  className?: string;
  id: string;
}

// TODO: instead of localStorage, store in db for cross device
const Banner = ({ id, children, className }: Props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (window) {
      const item = window.localStorage.getItem(id);
      if (!item) {
        setOpen(true);
      }
    }
  }, [id]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(
        "p-2 rounded-lg border border-gray-200 dark:border-gray-800",
        className
      )}
    >
      <div className="flex items-center justify-between flex-wrap">
        <div className="w-0 flex-1 flex flex-col justify-center">
          {children}
        </div>
        <div className="ml-1 flex-shrink-0">
          <button
            onClick={() => {
              if (window) {
                window.localStorage.setItem(id, "true");
                setOpen(false);
              }
            }}
            className="p-2"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Title = ({ children }: Base) => {
  // truncate
  return <Text className="ml-2 font-medium mb-0">{children}</Text>;
};
const Description = ({ children }: Base) => {
  return (
    <Text className="ml-2 mb-0" variant="description">
      {children}
    </Text>
  );
};

Banner.Title = Title;
Banner.Description = Description;

export default Banner;
