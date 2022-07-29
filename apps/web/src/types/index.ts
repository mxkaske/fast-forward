export type Post = {
  title: string;
  section: string;
  excerpt: string;
  date: string;
  slug: string;
  coverImage: string;
  // FIXME: author as object and corresponding generics in ../lib/api (Record<T, string>)
  content: string;
};
