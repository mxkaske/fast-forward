import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Feature = defineDocumentType(() => ({
  name: "Feature",
  filePathPattern: `features/**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the feature",
      required: true,
    },
    emoji: {
      type: "string",
      description: "The emoji of the feature",
      required: true,
    },
    excerpt: {
      type: "string",
      description: "The excerpt of the feature",
      required: true,
    },
  },
  computedFields: {
    path: {
      type: "json",
      resolve: (_) => {
        const [dir, fileName] = _._raw.flattenedPath.split("/");
        const [, , orderStr, slug] = fileName.match(/^((\d+)-)?(.*)$/) ?? [];
        const order = orderStr ? parseInt(orderStr) : 0;
        return { order, slug, url: `/${dir}/${slug}` };
      },
    },
  },
}));

export const FAQ = defineDocumentType(() => ({
  name: "Question",
  filePathPattern: `faqs/**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the question",
      required: true,
    },
    emoji: {
      type: "string",
      description: "The emoji of the question",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (_) => _._raw.sourceFileName.replace(/\.[^.$]+$/, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Feature, FAQ],
});
