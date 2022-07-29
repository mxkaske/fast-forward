import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    const feedback = await prisma.feedback.findUnique({
      where: {
        id: String(req.query.feedbackId),
      },
      include: {
        project: true,
      },
    });
    const member = await prisma.member.findFirst({
      where: {
        userId: session!.user.id,
        teamId: feedback?.project.teamId,
      },
    });

    const authorized = session?.user.id === feedback?.project.userId || member;

    if (!authorized) {
      return res.status(401).end("Not authorized");
    }

    switch (req.method) {
      case "GET": {
        return res.status(200).json(feedback);
      }
      case "PUT": {
        const newEntry = await prisma.feedback.update({
          where: {
            id: String(req.query.feedbackId),
          },
          data: {
            ...req.body,
            updatedAt: new Date(),
          },
        });
        return res.status(200).json(newEntry);
      }
      case "DELETE": {
        const deleteEntry = await prisma.feedback.update({
          where: {
            id: String(req.query.feedbackId),
          },
          data: {
            deleted: true,
          },
        });
        return res.status(200).json(deleteEntry);
      }
      default: {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// withAuth
export default withAuth(handler);
