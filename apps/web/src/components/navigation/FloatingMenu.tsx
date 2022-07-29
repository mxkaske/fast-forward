import React from "react";
import ReactDOM from "react-dom";
import cn from "classnames";

// TODO: find better use of it!

interface Props {
  buttons?: {
    label: string;
    icon?: string;
    onClick: () => void;
    active?: boolean;
  }[];
}

const FloatingMenu = ({ buttons }: Props) => {
  const _main = document.getElementById("__main");
  const _next = document.getElementById("__next");

  if (!_next) {
    return null;
  }

  // TODO: on small displays, only show icon, nothing else
  return ReactDOM.createPortal(
    <div className="fixed bottom-6 left-[50%] translate-x-[-50%] min-w-max">
      <div className="min-w-max flex space-x-2 py-6 px-5 bg-white dark:bg-black rounded-full border border-gray-200 dark:border-gray-800 shadow-md">
        {buttons?.map((value, key) => (
          <button
            key={key}
            onClick={value.onClick}
            className={cn(
              "p-3 -my-3 flex-shrink-0 rounded-full text-sm sm:text-base",
              value.active
                ? "bg-gray-100 dark:bg-gray-900"
                : "hover:bg-gray-50 dark:hover:bg-gray-900"
            )}
          >
            {value.icon}
            <span className="sr-only sm:not-sr-only">{` ${value.label}`}</span>
          </button>
        ))}
      </div>
    </div>,
    _next
    // document.getElementById("__next")!
    // document.body
    // document.getElementById("__main")!
  );
};

export default FloatingMenu;
