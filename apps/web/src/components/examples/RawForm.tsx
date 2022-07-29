import React from "react";

const RawForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      text: { value: string };
      type: { value: "ISSUE" | "IDEA" | "OTHER" };
    };
    try {
      await fetch(`https://fast-forward.app/api/feedback`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          text: target.text.value,
          type: target.type.value,
          projectId: "", // process.env.NEXT_PUBLIC_DEMO_PROJECT_ID
          // metadata: { lang: "en" },
          // userId: "hello@fast-forward.app",
          // screenshotURL: "https://res.cloudinary.com/...",
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="radio" name="type" id="issue" value="ISSUE" />
        <label htmlFor="issue">issue</label>
        <input type="radio" name="type" id="idea" value="IDEA" />
        <label htmlFor="idea">idea</label>
        <input type="radio" name="type" id="other" value="OTHER" />
        <label htmlFor="other">other</label>
      </div>
      <div>
        <label htmlFor="text">Message</label>
        <textarea name="text" />
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default RawForm;
