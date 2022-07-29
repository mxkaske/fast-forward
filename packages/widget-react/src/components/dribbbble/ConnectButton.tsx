import * as React from "react";
import { FeedbackBase, Themes } from "../../types";
import cn from "classnames";
import { Popover } from "../Popover";
import Dribbbble from "./index";

// TODO: pass floating-ui placement props to `Popover`
// FIXME: refactor lang to locale

interface ConnectButtonProps extends FeedbackBase {
  children: React.ReactNode;
  // as?: React.ElementType;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const ConnectButton = ({
  children,
  // as = "button",
  buttonProps,
  ...props
}: ConnectButtonProps) => {
  // const Element = (props: React.HTMLAttributes<HTMLButtonElement>) =>
  //   React.createElement(as, props, children); // FIXME: props

  return (
    <Popover
      render={({ close, labelId, descriptionId }) => (
        <Dribbbble close={close} {...props} />
      )}
    >
      {/* TODO: If React.createElement, we have to pass ref to element */}
      {/* <Element id="ff-widget-button" /> */}
      <button id="ff-widget-button" {...buttonProps}>
        {children}
      </button>
    </Popover>
  );
};

export default ConnectButton;
