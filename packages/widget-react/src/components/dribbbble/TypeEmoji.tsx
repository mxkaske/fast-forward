import * as React from "react";
import { Type } from "./Provider";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  type: Type;
}

const TypeEmoji = ({ type, ...props }: Props) => {
  return (
    <span {...props}>
      {(() => {
        switch (type) {
          case "BUG":
            return "🐞";
          case "ISSUE":
            return "⚠️";
          case "OTHER":
            return "💬";
          default:
            return "";
        }
      })()}
    </span>
  );
};

export default TypeEmoji;
