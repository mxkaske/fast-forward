import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import type { Post } from "@/types/index";

const postsDirectory = join(process.cwd(), "content/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

// TODO: Extract into separate, more dynamic function
export function getPostBySlug<T extends keyof Post>(
  slug: string,
  fields?: T[]
) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Record<T, string> = {} as Record<T, string>;

  if (fields) {
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = realSlug;
      }
      if (field === "content") {
        items[field] = content;
      }
      if (data[field]) {
        items[field] = data[field];
      }
    });
  } else {
    Object.keys(data).forEach((field: unknown) => {
      // FIXME:
      // @ts-ignore
      items[field] = data[field];
    });
  }

  return items;
}

export function getAllPosts<T extends keyof Post>(fields: T[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug, fields));
  return posts;
}
