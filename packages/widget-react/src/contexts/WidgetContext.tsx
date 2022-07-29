import * as React from "react";
import cn from "classnames";
import { LanguageCode } from "../utils/translations";
import { Themes } from "../types";

// translation / locale , theme, style, active step...

// FIXME: refactor types
interface WidgetContextProps {
  locale?: LanguageCode; // Locale
  theme?: Themes; // Theme
  // messages...
  // project: string;
  // userId?: string | null;
}

const WidgetContext = React.createContext<WidgetContextProps | null>(null);

export const useWidget = () => {
  const ctx = React.useContext(WidgetContext);
  if (!ctx) {
    throw new Error("Missing Provider");
  }
  return ctx;
};

interface WidgetProviderProps extends WidgetContextProps {
  children: React.ReactNode;
}

const WidgetProvider = ({
  children,
  locale = "en",
  theme = "theme-light",
}: WidgetProviderProps) => {
  const value = { locale, theme };
  return (
    <WidgetContext.Provider value={value}>
      <div id="ff-widget" className={cn(theme)}>
        {children}
      </div>
    </WidgetContext.Provider>
  );
};

export default WidgetProvider;
