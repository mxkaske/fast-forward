import React, { FormEvent, useCallback, useRef, useState } from "react";
import { addNewsletterSubscription } from "@/lib/db";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Input from "../ui/Input";

const Newsletter = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<"idle" | "loading" | "error" | "success">(
    "idle"
  );
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setForm("loading");
      const target = event.target as typeof event.target & {
        email: { value: string };
      };
      try {
        await addNewsletterSubscription(target.email.value);
        setForm("success");
        formRef.current?.reset();
      } catch (error) {
        setForm("error");
      }
    },
    []
  );
  return (
    <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
      <Heading as="h3">Subscribe to the newsletter</Heading>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        Get emails about web development, tech, and early access to new
        articles.
      </p>
      <form ref={formRef} className="flex space-x-2" onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          srOnly
          placeholder="maximilian@kaske.org"
          className="sm:w-64"
          required
        />
        <div className="mt-1 flex">
          <Button type="submit" reverse className="pl-4 pr-4">
            {form === "loading" ? "Loading..." : "Subscribe"}
          </Button>
        </div>
      </form>
      <p className="pt-2 text-sm font-medium">
        {form === "error" ? (
          <span className="text-red-800 dark:text-red-400">
            Something went wrong!
          </span>
        ) : form === "success" ? (
          <span className="text-green-700 dark:text-green-400">
            {`Hooray! You're now on the list.`}
          </span>
        ) : (
          <span className="text-gray-600 dark:text-gray-400">
            {`Lets make it great. Now.`}
          </span>
        )}
      </p>
    </div>
  );
};

export default Newsletter;
