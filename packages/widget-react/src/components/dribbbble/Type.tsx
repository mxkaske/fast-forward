import * as React from "react";
import cn from "classnames";
import Container from "./Container";
import Indicator from "./Indicator";
import { Type, types, useFFContext } from "./Provider";
import TypeEmoji from "./TypeEmoji";

const Type = () => {
  const { setState, type, setType } = useFFContext();

  return (
    <Container>
      <div className="space-y-2">
        <Indicator />
        <p className="font-medium text-black tracking-wide">
          What is in your mind?
        </p>
        <div className="flex space-x-4">
          <div className="flex space-x-1">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  setState("feedback");
                  // setTimeout(() => setState("feedback"), 1000);
                }}
                className={cn(
                  "border border-gray-light py-2 px-5 rounded-md lowercase",
                  type === t
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white text-gray bg-white" // type => bg-primary
                )}
              >
                <TypeEmoji type={t} className="mr-1" />
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Type;
