import * as React from "react";
import { FeedbackBase, Themes } from "../types";
import Form from "./Form";
import cn from "classnames";
import { Popover } from "./Popover";
import WidgetProvider from "../contexts/WidgetContext";

// TODO: pass floating-ui placement props to `Popover`
// FIXME: refactor lang to locale

interface ConnectButtonProps extends FeedbackBase {
  children: React.ReactNode;
  theme?: Themes;
  // TODO: only needed for playground theme update support
  // Much better would be Record<Themes, WidgetTheme>
  // Avoid passing css var - instead assign them later!
  themeColors?: { "--ff-color-primary": string };
  as?: React.ElementType;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const ConnectButton = ({
  children,
  as = "button",
  theme,
  lang,
  buttonProps,
  ...props
}: ConnectButtonProps) => {
  const Element = (props: React.HTMLAttributes<HTMLButtonElement>) =>
    React.createElement(as, props, children); // FIXME: props

  return (
    <Popover
      render={({ close, labelId, descriptionId }) => (
        <WidgetProvider theme={theme} locale={lang}>
          <Form close={close} lang={lang} {...props} />
        </WidgetProvider>
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
