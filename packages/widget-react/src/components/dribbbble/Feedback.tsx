import * as React from "react";
import cn from "classnames";
import Container from "./Container";
import Indicator from "./Indicator";
import { useFFContext } from "./Provider";
import TypeEmoji from "./TypeEmoji";
import LoadingIcon from "../icons/LoadingIcon";

// TODO: screenshotURL

const Feedback = () => {
  const [loading, setLoading] = React.useState(false);
  const { setState, type, widgetProps } = useFFContext();
  const { domain, lang, ...props } = widgetProps;

  // FIXME: update to https://fast-forward.app
  const currentDomain = domain || "https://staging.fast-forward.app";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const target = event.target as typeof event.target & {
      message: { value: string };
    };
    try {
      const body = JSON.stringify({
        text: target.message.value,
        type: type,
        ...props,
        // screenshotURL,
      });
      console.log(body);
      await fetch(`${currentDomain}/api/feedback`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body,
      });
      // FIXME: catch error on fetch
      setState("success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="space-y-2">
        <div className="flex items-center justify-between relative">
          <Indicator />
          {/* TODO: missing bg-gray-lightest color */}
          <button
            onClick={() => setState("type")}
            className="rounded-full p-1 absolute right-0 -top-1 hover:bg-gray-light/20"
          >
            <TypeEmoji className="" type={type} />
          </button>
        </div>
        <p className="font-medium text-black tracking-wide">
          Anything that can be improved?
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            className="rounded-md border border-gray-light resize-none w-full"
            placeholder="Tell us about..."
            id="message"
            name="message"
            rows={3}
            required
            autoFocus
          />
          {/* TODO: add loading state when submitted */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "!bg-black text-white px-5 py-2 rounded-md !mt-0 h-[40px]",
              {
                "cursor-not-allowed": loading,
              }
            )}
          >
            {loading ? (
              <LoadingIcon className="w-4 h-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Feedback;
