import * as React from "react";
import cn from "classnames";
import { FeedbackBase } from "../../types";

// translation / locale , theme, style, active step...

export const states = ["type", "feedback", "success"] as const;
export const types = ["ISSUE", "BUG", "OTHER"] as const; // has to be same as prisma enum

export type State = typeof states[number];
export type Type = typeof types[number] | undefined;

// FIXME: refactor types
interface ContextProps {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  type: Type;
  setType: React.Dispatch<React.SetStateAction<Type>>;
  widgetProps: FeedbackBase;
}

const Context = React.createContext<ContextProps | null>(null);

export const useFFContext = () => {
  const ctx = React.useContext(Context);
  if (!ctx) {
    throw new Error("Missing Provider");
  }
  return ctx;
};

interface ProviderProps extends FeedbackBase {
  children: React.ReactNode;
}

const Provider = ({ children, ...props }: ProviderProps) => {
  const [state, setState] = React.useState<State>("type");
  const [type, setType] = React.useState<Type>();
  const value = { state, setState, type, setType, widgetProps: props };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
