import type { NextPage } from "next";
import React, { useState } from "react";
import { ConnectButton, DribbbbleConnectButton } from "@fdbk/widget-react";
import { RadioCard, Heading } from "@fast-forward/ui";
import cn from "classnames";

// TODO: Make it automatically visible
// No need to press the button to toggle modal box

const config = {
  locale: ["en", "de", "fr"],
  theme: ["theme-light", "theme-dark"],
} as const;

const styles = {
  indigo: "79 70 229",
  pink: "236 72 153",
  teal: "20 184 166",
  orange: "249 115 22",
};

const Home: NextPage = () => {
  const [form, setForm] = useState<{
    locale: typeof config.locale[number];
    theme: typeof config.theme[number];
    // style?: keyof typeof config.style // React.CSSProperties;
  }>({
    locale: "en",
    theme: "theme-light",
  });
  const [style, setStyle] = useState<keyof typeof styles>("indigo");

  return (
    <main className="flex flex-col min-h-screen min-w-screen justify-center items-center">
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <ConnectButton
            projectId={process.env.NEXT_PUBLIC_DEMO_PROJECT_ID!}
            lang={form.locale}
            theme={form.theme}
            // show locale only if not default
            metadata={
              form.locale !== "en" ? { locale: form.locale } : undefined
            }
            // TODO: extend theme with the ThemeCSS | keyof theme | undefined
            themeColors={{
              "--ff-color-primary": styles[style],
            }}
            buttonProps={{
              className: `bg-indigo-500 rounded-full text-white px-3 py-2`,
            }}
          >
            feedback
          </ConnectButton>
        </div>
        <form>
          {Object.keys(config).map((c) => {
            return (
              <div key={c}>
                <Heading className="capitalize">{c}</Heading>
                <div className="flex">
                  {config[c as keyof typeof config].map((l) => {
                    const name = c as keyof typeof config;
                    return (
                      <RadioCard
                        key={l}
                        id={l}
                        name={c}
                        onClick={() => setForm((prev) => ({ ...prev, [c]: l }))}
                        className={cn(
                          "mr-2",
                          form[name] === l
                            ? "bg-indigo-500 text-white"
                            : "text-black"
                        )}
                      >
                        {l}
                      </RadioCard>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div>
            <Heading>Style</Heading>
            <div className="flex">
              {Object.keys(styles).map((s) => (
                <RadioCard
                  id={s}
                  key={s}
                  onClick={() => setStyle(s as keyof typeof styles)}
                  className={cn(
                    "mr-2",
                    style === s ? "bg-indigo-500 text-white" : "text-black"
                  )}
                >
                  {s}
                </RadioCard>
              ))}
            </div>
          </div>
        </form>
      </div>
      <DribbbbleConnectButton
        projectId={process.env.NEXT_PUBLIC_DEMO_PROJECT_ID!}
        domain={
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : undefined
        }
        lang={form.locale}
        metadata={form.locale !== "en" ? { locale: form.locale } : undefined}
        buttonProps={{
          className: `bg-black rounded-full text-white px-3 py-2 mt-6`,
        }}
      >
        feedback
      </DribbbbleConnectButton>
    </main>
  );
};

export default Home;
