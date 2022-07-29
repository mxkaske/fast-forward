import { withAuth } from "@/lib/middleware";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    const { inviteId } = req.query as { inviteId: string };
    switch (req.method) {
      case "PUT": {
        //
        return res.status(200).json({});
      }
      case "DELETE": {
        const entry = await prisma.invite.delete({
          where: {
            id: inviteId,
          },
        });
        return res.status(200).json(entry);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default withAuth(handler);
