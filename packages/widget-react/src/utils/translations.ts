import { Translation } from "../types";

const translations: Record<"en" | "de" | "fr", Translation> = {
  en: {
    // title: "What comes to your mind?"
    type: {
      label: "Type",
      options: {
        issue: {
          label: "Issue",
        },
        idea: { label: "Idea" },
        other: { label: "Other" },
      },
    },
    comment: { label: "Comment", placeholder: "Tell us about..." },
    submit: {
      label: "Submit",
      state: {
        loading: "Loading",
        success: "Thanks for the feedback!",
        error: "Error - Try again",
      },
    },
  },
  de: {
    type: {
      label: "Typ",
      options: {
        issue: {
          label: "Problem",
        },
        idea: { label: "Idee" },
        other: { label: "Sonstiges" },
      },
    },
    comment: { label: "Kommentar", placeholder: "Es ist mir aufgefallen..." },
    submit: {
      label: "Senden",
      state: {
        loading: "Lädt",
        success: "Danke für dein Feedback!",
        error: "Fehler - Nochmal versuchen",
      },
    },
  },
  fr: {
    type: {
      label: "Type",
      options: {
        issue: {
          label: "Problème",
        },
        idea: { label: "Idée" },
        other: { label: "Autres" },
      },
    },
    comment: { label: "Commentaire", placeholder: "J'ai remarqué..." },
    submit: {
      label: "Envoyer",
      state: {
        loading: "charge",
        success: "Merci pour ton Feedback!",
        error: "Problème - réessayer",
      },
    },
  },
} as const;

export type LanguageCode = keyof typeof translations;

export function formattedMessages(lang: string) {
  if (Object.keys(translations).includes(lang)) {
    return translations[lang as LanguageCode];
  } else {
    console.log(`Language code not found: ${lang}`);
    return translations["en"];
  }
}

export default translations;
