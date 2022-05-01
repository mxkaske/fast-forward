import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../ui/Button";
import { formattedMessages } from "./translations";
import LoadingIcon from "../icon/Loading";
import { CheckIcon, CameraIcon, XIcon } from "@heroicons/react/solid";
import { FeedbackType } from "@prisma/client";
import RadioCard from "../ui/RadioCard";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { toPng } from "html-to-image";
import { CloudUploadIcon } from "@heroicons/react/outline";
import Image from "next/image";

// Basic WidgetForm with Screenshot button

interface Props {
  userId?: string | null;
  projectId?: string;
  lang?: string;
  metadata?: Record<string, string | null | undefined | number>;
  domain?: string;
  closePanel: () => void;
}

const WidgetForm = ({
  closePanel,
  userId,
  lang,
  projectId,
  metadata,
  domain,
}: Props) => {
  const [form, setForm] = useState<"idle" | "pending" | "error" | "success">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [uploadState, setUploadState] = useState<
    "idle" | "pending" | "error" | "success"
  >("idle");
  const [screenshotURL, setScreenshotURL] = useState<string | undefined>();
  // "https://res.cloudinary.com/deh02ip3x/image/upload/v1651418026/wb7iv4svvwm4n6ndkkwj.png"
  const [text, setText] = useState<string>("");
  const { mutate } = useSWR(`/api/projects/${projectId}`, fetcher);

  useEffect(() => {
    let timer: undefined | NodeJS.Timeout;
    if (form === "success") {
      timer = setTimeout(() => {
        closePanel();
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [form, closePanel]);

  useEffect(() => {
    if (text !== "" && form !== "idle") {
      setForm("idle");
    }
  }, [text, form]);

  const handleReset = useCallback(() => {
    formRef.current?.reset();
    setText("");
    setUploadState("idle");
    setScreenshotURL(undefined);
    setForm("success");
    mutate();
  }, [mutate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm("pending");
    const target = event.target as typeof event.target & {
      text: { value: string };
      type: { value: FeedbackType };
    };
    try {
      // REMINDER: remove sendFeedbackPromiseToast later
      await fetch(`${domain || ""}/api/feedback`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          text: target.text.value,
          type: target.type.value,
          projectId,
          // userAgent: window.navigator.userAgent,
          // location: window.document.location.href,
          metadata,
          userId,
          screenshotURL,
        }),
      });
      handleReset();
    } catch (error) {
      setForm("error");
    }
  };

  const messages = formattedMessages(
    lang || document.documentElement.lang || "en"
  );

  const renderState = () => {
    switch (form) {
      case "idle":
        return messages.submit.label;
      case "pending":
        return (
          <LoadingIcon className="w-4 h-4 mx-auto my-1 text-gray-500 animate-spin" />
        );
      case "error":
        return "error";
      case "success":
        return <CheckIcon className="w-4 h-4 mx-auto my-1 text-green-500" />;
    }
  };

  const types = {
    issue: {
      label: messages.type.options.issue.label,
      defaultChecked: true,
      value: "ISSUE",
      icon: "🚧",
    },
    idea: {
      label: messages.type.options.idea.label,
      defaultChecked: false,
      value: "IDEA",
      icon: "💡",
    },
    other: {
      label: messages.type.options.other.label,
      defaultChecked: false,
      value: "OTHER",
      icon: "💬",
    },
  };

  const resetScreenshot = () => {
    setScreenshotURL(undefined);
    setUploadState("idle");
  };

  const onScreenshot = () => {
    if (document.getElementsByTagName("body")) {
      setUploadState("pending");
      toPng(document.getElementsByTagName("body")[0], {
        filter: (node) => {
          return node.id !== "widget";
        },
      })
        .then(function (dataUrl) {
          fetch(`/api/cloudinary`, {
            method: "POST",
            body: JSON.stringify({
              screenshot: dataUrl,
            }),
          })
            .then((res) => res.json())
            .then((json) => {
              // missing Cloudinary types
              setScreenshotURL(json.secure_url);
              setUploadState("success");
            })
            .catch(() => {
              setUploadState("error");
            });
        })
        .catch(() => {
          setUploadState("error");
        });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
      {/* <Radios label={messages.type.label} name="type" options={types} srOnly /> */}
      <div className="flex space-x-2">
        {Object.entries(types).map(([key, value]) => (
          <RadioCard
            key={key}
            name="type"
            id={value.value}
            value={value.value}
            size="sm"
            className="lowercase"
            defaultChecked={value?.defaultChecked}
          >
            {`${value.label} ${value.icon}`}
          </RadioCard>
        ))}
      </div>
      <label className="sr-only" htmlFor="text">
        Message
      </label>
      <textarea
        name="text"
        className="px-2 py-1 text-sm resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-100 dark:border-gray-900 rounded-md bg-transparent"
        placeholder={messages.comment.placeholder}
        rows={3}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <div className="flex space-x-2 items-center">
        {(() => {
          switch (uploadState) {
            case "idle":
              return (
                <button
                  className="p-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md"
                  type="button"
                  onClick={onScreenshot}
                >
                  <CameraIcon className="h-5 w-5" />
                </button>
              );
            case "pending":
              return (
                <span className="p-1">
                  <CloudUploadIcon className="h-5 w-5" />
                </span>
              );
            // case "error"
            case "success":
              return (
                <div className="relative h-[28px] max-w-[28px] min-w-[28px]">
                  <a
                    href={screenshotURL}
                    target="_blank"
                    rel="noreferrer"
                    className="block h-full w-full"
                  >
                    <Image
                      layout="fill"
                      alt=""
                      src={screenshotURL!}
                      objectFit="cover"
                    />
                  </a>
                  <button
                    type="button"
                    onClick={resetScreenshot}
                    className="absolute -right-1 -top-1 p-[2px] rounded-full bg-red-500 text-white dark:text-black"
                  >
                    <XIcon className="h-2 w-2" />
                  </button>
                </div>
              );
            default:
              return null;
          }
        })()}
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={text === ""}
          size="sm"
        >
          {renderState()}
        </Button>
      </div>
    </form>
  );
};

export default WidgetForm;
