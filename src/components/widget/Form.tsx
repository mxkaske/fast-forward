import React, { FC, FormEvent } from "react";
import Button from "../ui/Button";
import firebase from "firebase/app";
import { createFeedback } from "@/lib/db";
import Input from "../ui/Input";
import Radios from "../ui/Radios";
import { FeedbackType } from "@/types/index";

const PROJECT_ID = "bSyoWqKaC9kFEFzpYFpB";

interface Props {
  screenshotURL?: string;
  userId?: string;
}

const Form = ({ screenshotURL, userId }: Props) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      text: { value: string };
      type: { value: FeedbackType };
    };
    try {
      const baseFeedback = {
        text: target.text.value,
        type: target.type.value,
        projectId: PROJECT_ID,
        createdAt: firebase.firestore.Timestamp.now(),
        userAgent: window.navigator.userAgent,
        location: window.document.location.href,
      };
      createFeedback({
        ...baseFeedback,
        // Append to Object only if !undefined
        ...(screenshotURL && { screenshotURL }),
        ...(userId && { userId }),
      });
      event.currentTarget.reset();
    } catch {
      throw new Error("create Project failed");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Radios
        label="Type"
        name="type"
        options={{
          issue: {
            label: "Issue",
            defaultChecked: true,
          },
          other: { label: "Other" },
        }}
      />
      <Input label="Comment" name="text" />
      <Button reverse type="submit" data-html2canvas-ignore>
        Submit
      </Button>
    </form>
  );
};

export default Form;
