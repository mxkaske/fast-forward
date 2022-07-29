import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    const { projectId } = req.query as { projectId: string };

    const project = await prisma.project.findUnique({
      where: {
        id: String(projectId),
      },
      include: {
        feedbacks: {
          where: {
            deleted: false,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const ownProject = session?.user.id === project?.userId;

    switch (req.method) {
      case "GET": {
        if (!session?.user.id && project?.private) {
          return res.status(401).end("Not authenticated");
        }
        return res.status(200).json(project);
      }
      case "PUT": {
        if (!ownProject) {
          return res.status(401).end("Not authenticated");
        }
        const newEntry = await prisma.project.update({
          where: {
            id: projectId,
          },
          data: req.body,
        });
        return res.status(200).json(newEntry);
      }
      case "DELETE": {
        if (!ownProject) {
          return res.status(401).end("Not authenticated");
        }
        const deleteEntry = await prisma.project.update({
          where: {
            id: projectId,
          },
          data: {
            deleted: true,
          },
        });
        return res.status(200).json(deleteEntry);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
