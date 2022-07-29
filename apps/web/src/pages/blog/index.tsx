import { InferGetStaticPropsType } from "next";
import React from "react";
import Thumbnail from "@/components/blog/Thumbnail";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Heading } from "@fast-forward/ui";
import { getAllPosts } from "@/lib/api";

const AllPosts = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <DefaultLayout>
      <Heading>Blog</Heading>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        All the latest Fast Forward news.
      </p>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Thumbnail {...post} />
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts([
    "title",
    "excerpt",
    "date",
    "slug",
    "content",
    "section",
    "coverImage",
  ]).sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return {
    props: {
      posts,
    },
  };
};

export default AllPosts;
