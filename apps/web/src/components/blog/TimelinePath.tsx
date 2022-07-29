import cn from "classnames";
import React, { FC } from "react";

// TODO: extends SVGElement
interface Props {
  className?: string;
  first?: boolean;
}

const TimelinePath: FC<Props> = ({ className, first = false }) => {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn("w-3 h-3 mt-5 overflow-visible text-gray-300", className)}
    >
      <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
      {!first ? (
        <path
          d="M 6 -6 V -40"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          className="text-gray-200"
        />
      ) : (
        <circle
          cx="6"
          cy="6"
          r="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        ></circle>
      )}
      <path
        d="M 6 18 V 500"
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        className="text-gray-200"
      />
    </svg>
  );
};

export default TimelinePath;
