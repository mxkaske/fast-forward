import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { withAuth } from "@/lib/middleware";

// TODO: add organization

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { memberId } = req.query as { memberId: string };
    const session = await getSession({ req });
    switch (req.method) {
      case "GET": {
        const entry = await prisma.member.findUnique({
          where: {
            id: memberId,
          },
        });
        return res.status(200).json(entry);
      }
      case "PUT": {
        const entry = await prisma.member.update({
          where: { id: memberId },
          data: req.body,
        });
        return res.status(200).json(entry);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default withAuth(handler);
