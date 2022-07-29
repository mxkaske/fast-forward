import toast from "react-hot-toast";
import { DefaultToastOptions } from "react-hot-toast/dist/core/types";

const toastOptions: DefaultToastOptions = {
  className:
    "text-gray-900 dark:text-white bg-white dark:bg-black border border-gray-200 dark:border-gray-800",
};

const toastMessages = {
  promise: {
    default: {
      loading: "Loading...",
      success: "Success",
      error: "Something went wrong",
    },
    unauthorized: {
      loading: "Loading...",
      success: "Ok that should never happend",
      error: "You are unauthorized!",
    },
    create: {
      loading: "Creating...",
      success: "Created!",
      error: "Something went wrong",
    },
  },
  success: {
    default: "Success!",
    clipboard: "Copied to Clipboard",
  },
  blank: {
    default: "",
    createProject: "👈 Test it out!",
  },
};

const promise = (
  promise: Promise<unknown>,
  message: keyof typeof toastMessages.promise = "default"
) => toast.promise(promise, toastMessages.promise[message], toastOptions);

const success = (message: keyof typeof toastMessages.success = "default") =>
  toast.success(toastMessages.success[message], toastOptions);

const blank = (message: keyof typeof toastMessages.blank = "default") =>
  toast(toastMessages.blank[message], toastOptions);

const toasts = {
  promise,
  success,
  blank,
};

export default toasts;
