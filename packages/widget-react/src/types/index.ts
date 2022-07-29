import { LanguageCode } from "../utils/translations";

export type FeedbackBase = {
  userId?: string | null;
  projectId: string;
  lang?: LanguageCode;
  metadata?: Record<string, string | null | undefined | number>;
  domain?: string;
};

export type FeedbackForm = {
  text: string;
  type: FeedbackType;
  screeshotURL?: string;
};

export type FeedbackType = "ISSUE" | "IDEA" | "OTHER";

export type Translation = {
  // title: string;
  type: {
    label: string;
    options: {
      issue: { label: string };
      idea: { label: string };
      other: { label: string };
    };
  };
  comment: { label: string; placeholder: string };
  submit: {
    label: string;
    state: {
      loading: string;
      success: string;
      error: string;
    };
  };
};

export type Themes = "theme-dark" | "theme-light" | undefined;
