import { useRouter } from "next/router";
import React, { useCallback, FormEvent } from "react";
import useSWR from "swr";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import fetcher, { deletor, updator } from "@/utils/fetcher";

import toasts from "@/utils/toast";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import prisma from "@/lib/prisma";
import { Feedback, Project } from ".prisma/client";
import { Checkbox, Heading, Text, Input, Button } from "@fast-forward/ui";
import { getSession } from "next-auth/react";

// TODO: remove publically as state - use the data.project.private boolean
// Problem: on first render of the Switch Component - it will have no data and so the wrong value
// Create Indicator and fetch dat first

// Settings: ComponentWithAuth removed because of ts error
const Settings = ({
  fallbackData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        router.replace("/projects")
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
    const res = confirm("Do you want to delete this project?");
    if (res) _delete();
  }, [_delete]);

  const handleReset = useCallback(() => {
    const res = confirm("Do you want to reset this project?");
    if (res) {
      toasts.promise(
        Promise.all(
          data
            ? [
                ...data.feedbacks.map(async (feedback) => {
                  await deletor(`/api/feedback/${feedback.id}`);
                }),
                updator(`/api/projects/${projectId}`, {
                  reseted: data.reseted + 1,
                }),
              ]
            : []
        ).then(() => mutate())
      );
    }
  }, [data, mutate, projectId]);

  return (
    <DefaultUserLayout messages={{ projectId: data?.name }}>
      <form onSubmit={onSubmit} className="max-w-md">
        <Input name="name" label="Name" defaultValue={data?.name} />
        <div className="text-right">
          <Button type="submit" variant="primary">
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
          label="private project"
          name="private-project"
          checked={!!data?.private}
          onChange={() => update({ private: !data?.private })}
        />
      </div>
      <div className="my-4">
        <Text variant="description">
          Notifications are{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {data?.notifications ? "on" : "off"}
          </span>
        </Text>
        <Checkbox
          label="toggle notifications"
          name="notifications-project"
          checked={data?.notifications}
          onChange={() => update({ notifications: !data?.notifications })}
        />
      </div>
      <Heading as="h4">Danger Zone</Heading>
      <div className="max-w-md grid grid-cols-3">
        <Text variant="description" className="col-span-2">
          Removes all feedbacks but keeps the configuration:
        </Text>
        <div className="text-right">
          <Button onClick={handleReset} variant="danger">
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
            variant="danger"
            className="text-right"
          >
            Delete
          </Button>
        </div>
      </div>
    </DefaultUserLayout>
  );
};

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ projectId: string }>
) => {
  const session = await getSession(ctx);
  const project = await prisma.project.findUnique({
    where: {
      id: ctx.params?.projectId,
      // findUnique only accepts "id"
      // userId: session?.user?.id, // only creator can access project
    },
    // FIXME: remove this... no need
    include: {
      feedbacks: {
        where: {
          deleted: false,
        },
      },
    },
  });

  console.log(session, project);

  // redirect user if not project creator
  if (session?.user.id !== project?.userId) {
    return {
      redirect: {
        destination: "/projects",
        permanent: false,
        // statusCode: 301,
      },
    };
  }

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fallbackData: project || undefined,
    },
  };
};

Settings.auth = {
  role: "admin",
};

export default Settings;
