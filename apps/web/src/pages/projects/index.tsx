import React from "react";
import useSWR from "swr";
import type { ComponentWithAuth } from "@/components/auth/Auth";
import { Button } from "@fast-forward/ui";
import fetcher, { creator } from "@/utils/fetcher";
import toasts from "@/utils/toast";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Project, Feedback } from ".prisma/client";
import { FolderAddIcon } from "@heroicons/react/outline";
import EmptyState from "@/components/common/EmptyState";
import { useRouter } from "next/router";
import Card from "@/components/project/Card";

const Projects: ComponentWithAuth = ({
  fallbackData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: projects, mutate } = useSWR<
    (Project & { feedbacks: Feedback[] })[]
  >("/api/projects", fetcher, {
    fallbackData,
  });

  const words = ["pencil", "hands", "dog", "soup", "hat"];
  const emojis = ["🎨", "🧤", "👟", "🙈", "🐷", "🍄"];

  const handleCreate = async () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newProject = {
      name: `${randomWord} ${randomEmoji}`,
    };
    try {
      // FIXME: even on error, it will succeed
      const project = (await toasts.promise(
        creator("/api/projects", newProject),
        "create"
      )) as Project;
      toasts.blank("createProject");
      // router.push(`/projects/${project.id}`);
      mutate();
    } catch {
      console.warn("Something went wrong");
    }
  };

  return (
    <DefaultUserLayout>
      {projects && projects.length > 0 ? (
        <>
          <Button onClick={handleCreate} variant="primary">
            new project
          </Button>
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
            {projects?.map((project, idx) => {
              return <Card key={project.id} {...{ project }} />;
            })}
          </div>
        </>
      ) : (
        <EmptyState
          title={"No projects"}
          description="Get started by creating a new project."
          onClick={handleCreate}
          buttonTitle={"New Project"}
          icon={FolderAddIcon}
        />
      )}
    </DefaultUserLayout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  const members = await prisma.member.findMany({
    where: { userId: session?.user.id },
  });
  // DISCUSS: keep the OR query?
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        {
          userId: session?.user.id,
          deleted: false,
        },
        {
          teamId: {
            in: members.map((m) => m.teamId),
          },
          deleted: false,
        },
      ],
    },
    include: {
      feedbacks: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      fallbackData: projects,
    },
  };
}

Projects.auth = {};

export default Projects;
