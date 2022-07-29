import Head from "next/head";
import { allFeatures } from "contentlayer/generated";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Heading, Link, Text } from "@fast-forward/ui";
import IconBg from "@/components/ui/IconBg";
import { InferGetStaticPropsType } from "next";
import NextLink from "next/link";

const sortedFeatures = allFeatures.sort((a, b) => a.path.order - b.path.order);

const Feature = ({
  feature,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const i = sortedFeatures.findIndex((i) => feature.path.slug === i.path.slug);
  const prev = i > 0 && sortedFeatures[i - 1];
  const next = i < sortedFeatures.length && sortedFeatures[i + 1];
  console.log(prev, next);
  return (
    <>
      <Head>
        <title>{feature.title}</title>
      </Head>
      <DefaultLayout>
        {/* <Link href="/">back to home</Link> */}
        <article className="flex-1">
          <IconBg>{feature.emoji}</IconBg>
          <Heading className="mt-3">{feature.title}</Heading>
          <div
            className="prose dark:prose-dark"
            dangerouslySetInnerHTML={{ __html: feature.body.html }}
          />
        </article>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8">
          {prev && (
            <div className="col-start-1">
              <NextLink href={prev.path.url} passHref>
                <a className="rounded-md border border-gray-200 dark:border-gray-800 p-2 block hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500">
                  <div className="flex justify-start items-center space-x-2">
                    <IconBg>{prev.emoji}</IconBg>
                    <div>
                      <Text variant="description" className="mb-0">
                        Previous
                      </Text>
                      <Text>{prev.title}</Text>
                    </div>
                  </div>
                </a>
              </NextLink>
            </div>
          )}
          {next && (
            <div className="col-start-2 sm:col-start-3">
              <NextLink href={next.path.url} passHref>
                <a className="rounded-md border border-gray-200 dark:border-gray-800 p-2 block hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500">
                  <div className="flex justify-end items-center space-x-2">
                    <div className="text-right">
                      <Text variant="description" className="mb-0">
                        Next
                      </Text>
                      <Text>{next.title}</Text>
                    </div>
                    <IconBg>{next.emoji}</IconBg>
                  </div>
                </a>
              </NextLink>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export async function getStaticPaths() {
  const paths = allFeatures.map((feature) => feature.path.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const feature = allFeatures.find(
    (feature) => feature.path.slug === params.slug
  );
  return {
    props: {
      feature,
    },
  };
}

export default Feature;
