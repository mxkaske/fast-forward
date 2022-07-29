---
title: "Welcome"
section: "Introduction"
excerpt: "Almost 2 months in the making, their is no perfect timing to start the release of this side project. A brief introduction about the inspiration, what problem it solves and what tech stack it is build on. And an overview of what the plans are to extend the tool."
coverImage: "/assets/blog/preview/welcome-pr.jpg"
date: "2020-10-10"
---

## Hey Folks 👋

It's been a while that I've been working in my free time on that project and there is no perfect timing to show off. So here I am, having no idea what I'm doing right now. 🤷‍♂️

## Inspiration 💡

So first of I want to thank all the open source maintainer and everyone who contributes to the community 👏. This project is heavily inspired by [React 2025](https://react2025.com/) made by [Lee Robinson](https://twitter.com/leeerob) and is using a lot of the same technologies. Luckily, in my professional day life, I am also confronted to the same libraries/frameworks so it was even more motivational to work around the tools. Also, I want to give props to [feedback.fish](https://feedback.fish) from the team around [Max Stoiber](https://twitter.com/mxstbr) as I copied some ideas from their tool. Check it out for production ready widgets.

## Fast Forward ⏩

The idea is pretty simple. Whenever I want to have a customizable _Feedback Widget_ I need an `API` endpoint to store my feedback without the pain of having to create that entire ecosystem around. I just want to register/login, create a project and use the `projectId` to send the feedbacks I collect from my new web app like:

```js
{
  "projectId": "xyz",
  "type": "bug",
  "text": "Check line 5, you are missing a semicolon. Other than that great blog post!.",
  "metadata": {
    "lang": "de"
  }
}
```

I also want to automatically retrieve informations about the

- _Timestamp_ 📅
- _Location_ 🗺
- _Device Metadata_ 📱

from the request so I don't have to worry about it.

And after checking the feedback, it would be good to archive them to keep track of what has been seen and revised or not. So therefore, we have an archive bucket to but old feedbacks in.

To **[show the demo](http://fast-forward.com/VWJU7eJdIEYGmoyKW4rp)**, you have the possibility to make your project _publically available_ so that you can share the project link and others have access to the feedback.

> Even though buttons like "archive" are visible, the functionality is prohibited by the `firebase.rules`.

If you want to check the rules, open the [firebase.rules](https://github.com/maximiliankaske/fast-forward-emulator/blob/main/firestore.rules) file from the `fast-forward-emulator` repository that I am using to test in _development_ environments and deploy afterwards to firebase.

If you are curious about how the **Floating Widget** on the current page was build with, [go check it](https://github.com/maximiliankaske/fast-forward/blob/main/components/widget/WidgetFABExample.tsx).

## Tech Stack 📚

If you know the [React 2025](https://react2025.com/) tech stack, you might already know most of them. Here a the biggest ones I'm using:

- **next**: the hero
- **tailwindcss**: the beauty
- **headlessui**: the complementary
- **firebase**: the hidden
- **md**: the creator
- ... and many more

But the easiest way for the moment would be to deep dive 🤿 into the [GitHub Repository](https://github.com/maximiliankaske/fast-forward).

Deployed on [Vercel](https://vercel.com) for perfect DX.

## Ideas 💡

I wish I could call it roadmap but as I am working fulltime and follow my hobbies / family / friends, let's stick with the wording of ideas that I came with to extend the tool:

- **Invite members** 👨 to a project: permission based user auth would be good for bigger companies.
- **Add Screenshot** 🖼 to a feedback: especially good if there is a UI bug.
  - Possibility 1: Give access to write to firebase storage throughout own `API`.
  - Possibility 2: Let the user handle the upload and only send the `url` to the storage provider (e.g. cloudinary).
- **Publish Widget Package** 📦: for an easy usage of this tool. Use what's there and inject your `projectId` for even faster configuration.

Any other good **Idea** I am missing? Please use the **Feedback Button** to let tell about it or contact me [@mxkaske](https://twitter.com/mxkaske).

---

> Everything starts with an idea. And the foundation is set. Wish me luck 🍀 that it won't last as any side projects.
