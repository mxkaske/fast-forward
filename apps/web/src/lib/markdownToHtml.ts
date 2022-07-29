import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    // @ts-ignore FIXME:
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown);
  return result.toString();
}
