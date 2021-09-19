import { PlusIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import useSWR, { mutate } from "swr";
import EmptyState from "../../components/app/EmptyState";
import Thumbnail from "../../components/app/Thumbnail";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import { useAuth } from "../../lib/auth";
import { createProject } from "../../lib/db";
import { Project, WithId } from "../../types";
import fetcher from "../../utils/fetcher";

const App: FC = () => {
  const { user } = useAuth();
  const { data } = useSWR<{ projects: WithId<Project>[] }>(
    user ? ["/api/projects", user.token] : null,
    fetcher
  );

  const handleCreate = async () => {
    const newSite = {
      authorId: user!.uid,
      name: `Project #${data?.projects ? data.projects.length + 1 : 1}`,
      private: true,
    };
    try {
      await createProject(newSite);
      mutate(["/api/projects", user!.token]);
    } catch {
      throw new Error("create Project failed");
    }
  };

  return (
    <DefaultLayout>
      <Heading as="h2">Dashboard</Heading>
      {user && (
        <div className="space-y-6 mt-6">
          {data?.projects ? (
            <>
              <Button
                onClick={handleCreate}
                className="inline-flex items-center"
                reverse
              >
                <PlusIcon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
                New Project
              </Button>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {data?.projects.map((project, idx) => (
                  <Thumbnail key={idx} {...project} />
                ))}
              </div>
            </>
          ) : (
            <EmptyState onClick={handleCreate} />
          )}
        </div>
      )}
    </DefaultLayout>
  );
};

export default App;
