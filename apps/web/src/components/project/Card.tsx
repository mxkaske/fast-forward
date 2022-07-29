import { Feedback, Project } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import React from "react";
import LinkContainer from "../common/LinkContainer";
import { Badge } from "@fast-forward/ui";

interface Props {
  project: Project & { feedbacks: Feedback[] };
}

const Card = ({ project }: Props) => {
  const session = useSession();
  const feedbacks =
    project.feedbacks?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) || [];
  console.log(feedbacks);
  return (
    <LinkContainer key={project.id} href={`/projects/${project.id}`}>
      <LinkContainer.Title>
        {project.name}
        {!project?.private && (
          <Badge size="sm" className="ml-2" color="primary">
            public
          </Badge>
        )}
        {project?.teamId !== session.data?.user.teamId && (
          <Badge size="sm" className="ml-2" color="primary">
            team
          </Badge>
        )}
      </LinkContainer.Title>
      <LinkContainer.Description>
        last feedback{" "}
        <span className="italic">
          {feedbacks.length > 0
            ? formatDistance(new Date(feedbacks[0].createdAt), new Date(), {
                addSuffix: true,
              })
            : "missing"}
        </span>
      </LinkContainer.Description>
    </LinkContainer>
  );
};

export default Card;
