import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    switch (req.method) {
      case "GET":
        const entries = await prisma.invite.findMany({
          where: {
            userId: session!.user.id,
          },
        });
        return res.status(200).json(entries);
      case "POST": {
        const now = new Date();
        const newEntry = await prisma.invite.create({
          data: {
            ...req.body,
            userId: session!.user.id,
            teamId: session!.user.teamId,
            // Add two weeks
            dueTo: new Date(now.setDate(now.getDate() + 14)),
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

export default withAuth(handler);
