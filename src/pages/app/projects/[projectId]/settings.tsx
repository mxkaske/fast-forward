import { useRouter } from "next/router";
import React, { useCallback, FormEvent } from "react";
import useSWR from "swr";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import fetcher, { deletor, updator } from "@/utils/fetcher";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import toasts from "@/utils/toast";
import { ComponentWithAuth } from "@/components/auth/Auth";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";
import { Feedback, Project } from ".prisma/client";
import Checkbox from "@/components/ui/Checkbox";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { getSession } from "next-auth/react";

// TODO: remove publically as state - use the data.project.private boolean
// Problem: on first render of the Switch Component - it will have no data and so the wrong value
// Create Indicator and fetch dat first

const Settings: ComponentWithAuth = ({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { projectId } = router.query;

  const { data, mutate } = useSWR<Project & { feedbacks: Feedback[] }>(
    `/api/projects/${projectId}`,
    fetcher,
    { fallbackData }
  );

  const update = useCallback(
    async (data: Partial<Project>) => {
      toasts.promise(
        updator(`/api/projects/${projectId}`, data).then(() => mutate())
      );
    },
    [mutate, projectId]
  );

  const _delete = useCallback(() => {
    toasts.promise(
      deletor(`/api/projects/${projectId}`).then(() =>
        router.replace("/app/projects")
      )
    );
  }, [projectId, router]);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const target = event.target as typeof event.target & {
        name: { value: string };
      };
      await update({ name: target.name.value });
    },
    [update]
  );

  const handleDelete = useCallback(async () => {
    const res = confirm("Delete?");
    if (res) _delete();
  }, [_delete]);

  const handleReset = useCallback(() => {
    const res = confirm("Reset");
    if (res) {
      toasts.promise(
        Promise.all(
          data?.feedbacks.map(async (feedback) => {
            await deletor(`/api/feedback/${feedback.id}`);
          }) || []
        )
      );
    }
  }, [data?.feedbacks]);

  return (
    <DefaultUserLayout messages={{ projectId: data?.name }}>
      <form onSubmit={onSubmit} className="max-w-md">
        <Input name="name" label="Name" defaultValue={data?.name} />
        <div className="text-right">
          <Button type="submit" variant="none">
            Save
          </Button>
        </div>
      </form>
      <div className="my-4">
        <Text variant="description">
          Your project is currently set to:{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {!data?.private
              ? "public (everyone with the link can access it)"
              : "private (only you have access)"}
          </span>
        </Text>
        <Checkbox
          label="Private project"
          name="private-project"
          checked={!!data?.private}
          onChange={() => update({ private: !data?.private })}
        />
      </div>
      <Heading as="h4">Danger Zone</Heading>
      <div className="max-w-md grid grid-cols-3">
        <Text variant="description" className="col-span-2">
          Removes all feedbacks but keeps the configuration:
        </Text>
        <div className="text-right">
          <Button onClick={handleReset} variant="danger2">
            Reset
          </Button>
        </div>
      </div>
      <div className="max-w-md grid grid-cols-3">
        <Text variant="description" className="col-span-2">
          Delete your Project. Please note that this is not reversable. Be
          certain:
        </Text>
        <div className="text-right">
          <Button
            onClick={handleDelete}
            variant="danger2"
            className="text-right"
          >
            Delete
          </Button>
        </div>
      </div>
    </DefaultUserLayout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ projectId: string }>) => {
  const session = await getSession();
  const entry = await prisma.project.findUnique({
    where: {
      id: params?.projectId,
    },
    include: {
      feedbacks: true,
    },
  });

  // redirect user if not project creator
  if (session?.user.id !== entry?.userId) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
        statusCode: 301,
      },
    };
  }

  return {
    props: {
      fallbackData: entry || undefined,
    },
  };
};

Settings.auth = {
  role: "admin",
};

export default Settings;
