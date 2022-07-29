// TODO: after refactor firebase-auth => call it `auth.ts`
import { Profile, User, Account } from "next-auth";
import prisma from "./prisma";

const signInEvent = async ({
  user,
}: {
  user: User;
  account: Account;
  profile?: Profile;
  isNewUser?: boolean;
}) => {
  try {
    const invite = await prisma.invite.findFirst({
      where: {
        email: user.email!,
        valid: true,
        dueTo: {
          gt: new Date(),
        },
      },
    });
    if (invite) {
      const { role, email, teamId } = invite;
      // const user = await prisma.user.findUnique({ where: { id: userId } });
      await prisma.member.create({
        // remove email from here as well
        data: { role, userId: user.id, email, teamId },
      });
      await prisma.invite.update({
        where: { id: invite.id },
        data: { valid: false },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export { signInEvent };
