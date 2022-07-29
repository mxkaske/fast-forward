import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    switch (req.method) {
      case "GET": {
        const members = await prisma.member.findMany({
          where: { userId: session?.user.id },
        });
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
        return res.status(200).json(projects);
      }
      case "POST": {
        // FIXME: errors are not getting resolved correctly
        const newEntry = await prisma.project.create({
          data: {
            userId: session!.user.id,
            teamId: session!.user.teamId,
            name: req.body.name || "",
          },
        });
        return res.status(200).json(newEntry);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
