import * as React from "react";
import { FeedbackBase } from "../../types";
import Feedback from "./Feedback";
import Provider, { useFFContext } from "./Provider";
import Success from "./Success";
import Type from "./Type";

interface PopupProps {
  close: () => void;
}

interface Props extends FeedbackBase, PopupProps {}

const Dribbbble = ({ close, ...props }: Props) => {
  return (
    <Provider {...props}>
      <Content close={close} />
    </Provider>
  );
};

const Content = ({ close }: PopupProps) => {
  const { state } = useFFContext();
  return (
    <div className="min-w-[350px]">
      {state === "type" ? <Type /> : undefined}
      {state === "feedback" ? <Feedback /> : undefined}
      {state === "success" ? <Success close={close} /> : undefined}
    </div>
  );
};

export default Dribbbble;
