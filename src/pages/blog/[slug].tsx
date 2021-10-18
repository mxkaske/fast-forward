import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import React from "react";
import markdownToHtml from "@/lib/markdownToHtml";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import Header from "@/components/post/Header";
import PostLayout from "@/components/layout/PostLayout";
import WidgetFABExample from "@/components/widget/WidgetFABExample";

const Posts = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PostLayout>
      <Head>
        <title>{post.title} | Fast Forward Blog</title>
        <meta property="og:image" content={post.coverImage} />
      </Head>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <Header {...post} />
          <div
            className="prose dark:prose-dark prose-lg mx-auto pb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </>
      )}
      <WidgetFABExample />
    </PostLayout>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = getPostBySlug(params?.slug as string, [
    "title",
    "excerpt",
    "date",
    "slug",
    "section",
    "content",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content);

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug", "date"]);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default Posts;
