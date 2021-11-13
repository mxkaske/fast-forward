import { PlusIcon } from "@heroicons/react/solid";
import React from "react";
import useSWR from "swr";
import ProjectEmptyState from "@/components/project/ProjectEmptyState";
import Thumbnail from "@/components/app/Thumbnail";
import type { ComponentWithAuth } from "@/components/auth/Auth";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { createProject } from "@/lib/db";
import { Project, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import toasts from "@/utils/toast";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";

const Projects: ComponentWithAuth = () => {
  const { user } = useAuth();
  const { data, mutate } = useSWR<{ projects: WithId<Project>[] }>(
    user ? ["/api/projects", user.token] : null,
    fetcher
  );

  const handleCreate = async () => {
    const newProject = {
      authorId: user!.uid,
      name: `Project #${data?.projects ? data.projects.length + 1 : 1}`,
      private: true,
    };
    try {
      await toasts.promise(createProject(newProject));
      mutate();
    } catch {
      console.warn("Something went wrong");
    }
  };

  return (
    <DefaultUserLayout>
      {/* TODO: FIXME: */}
      <div className="pb-12">
        <Breadcrumbs />
      </div>
      <div className="space-y-6 mt-6">
        {data?.projects && data.projects.length > 0 ? (
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
          <ProjectEmptyState onClick={handleCreate} />
        )}
      </div>
    </DefaultUserLayout>
  );
};

Projects.auth = {};

export default Projects;
