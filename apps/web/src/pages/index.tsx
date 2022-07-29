import DefaultLayout from "@/components/layout/DefaultLayout";
import { Heading } from "@fast-forward/ui";
import React from "react";
import Link from "next/link";
import { ExternalLinkIcon, LoginIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import cn from "classnames";
import prisma from "@/lib/prisma";
import { InferGetServerSidePropsType } from "next";
import Card from "@/components/feedback/Card";
import useSWR from "swr";
import { allFeatures } from "contentlayer/generated";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";

const styles = {
  btn: {
    base: "inline-flex items-center px-4 py-2 border border-gray-200 rounded-full dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
    demo: "text-white bg-gray-900 dark:bg-white dark:text-gray-900",
    login:
      "text-gray-900 bg-white dark:bg-black dark:text-white hover:border-gray-300 dark:hover:border-gray-700",
  },
};

const Home = ({
  fallbackData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const session = useSession();
  const { data: project } = useSWR(
    `/api/projects/${process.env.NEXT_PUBLIC_DEMO_PROJECT_ID}`,
    { fallbackData }
  );

  const feedback = project?.feedbacks.filter((i) => !i.archived)?.[0];

  const exists = session?.data?.user.id;
  return (
    <DefaultLayout className="space-y-6">
      <div className="grid md:grid-cols-6 gap-x-0 md:gap-x-6 py-6 md:py-12 lg:py-16">
        <div className="md:col-span-4">
          <Heading as="h1">
            The easiest way to collect{" "}
            <span className="animate-move-bg bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 bg-[length:400%] bg-clip-text text-transparent font-extrabold">
              Feedback
            </span>
            .
          </Heading>
        </div>
        <div className="md:col-span-2 hidden md:block" />
        <div className="md:col-span-4">
          <Heading as="h3">
            {`You want to collect feedback fast, reliable and without any big setup? Welcome to `}
            <span className="font-extrabold text-indigo-500 dark:text-pink-500">
              Fast Forward
            </span>
            .
          </Heading>
          <div className="space-x-4 mt-6">
            <a
              target="_blank"
              href={`/projects/${process.env.NEXT_PUBLIC_DEMO_PROJECT_ID}`}
              rel="noreferrer"
              className={cn(styles.btn.base, styles.btn.demo)}
            >
              Try the Demo
              <ExternalLinkIcon className="w-5 h-5 ml-2" />
            </a>
            <Link href={exists ? "/projects" : "/auth/signin"}>
              <a className={cn(styles.btn.base, styles.btn.login)}>
                {exists ? "Projects" : "Login"}
                <LoginIcon className="h-5 w-5 ml-2" />
              </a>
            </Link>
          </div>
        </div>
        <div className="col-span-full">
          {feedback && (
            <div className="ml-auto mt-8 lg:-mt-8 lg:-mr-16 w-full sm:w-3/4 md:w-3/5">
              <Heading as="h4" className="text-right">
                Latest Feedback 👇
              </Heading>
              <Card feedback={feedback} hideUser />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center py-3">
        <p>
          <a
            target="_blank"
            href={
              process.env.NODE_ENV === "production"
                ? "https://example.fast-forward.app"
                : "http://localhost:3001"
            }
            rel="noreferrer"
            className={cn(styles.btn.base, styles.btn.demo)}
          >
            Playground Configuration
            <ExternalLinkIcon className="w-5 h-5 ml-2" />
          </a>
        </p>
      </div>
      {/* <Features /> */}
      <FAQ />
    </DefaultLayout>
  );
};

export const getServerSideProps = async () => {
  const project = await prisma.project.findUnique({
    where: {
      id: process.env.NEXT_PUBLIC_DEMO_PROJECT_ID,
    },
    include: {
      feedbacks: {
        where: {
          archived: false,
          deleted: false,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return {
    props: {
      fallbackData: project,
    },
  };
};

export default Home;
