import { withAuth } from "@/lib/middleware";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    switch (req.method) {
      case "GET":
        const entries = await prisma.member.findMany({
          where: {
            teamId: session!.user.teamId,
          },
        });
        return res.status(200).json(entries);
      case "POST": {
        const newEntry = await prisma.member.create({
          data: req.body,
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
