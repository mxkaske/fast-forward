import {
  object,
  string,
  boolean,
  record,
  union,
  number,
  enums,
  optional,
} from "superstruct";

export const FeedbackType = enums(["all", "issue", "idea", "other", "archive"]);

// REMINDER: userAgent & location will added from server side

export const Feedback = object({
  text: string(),
  projectId: string(),
  userId: optional(string()),
  userAgent: optional(string()),
  location: optional(string()),
  type: FeedbackType,
  archived: optional(boolean()),
  screenshotURL: optional(string()),
  metadata: optional(record(string(), union([string(), number()]))),
});
