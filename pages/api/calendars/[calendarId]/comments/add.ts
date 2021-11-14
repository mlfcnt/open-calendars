// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Calendar, Comment, Prisma, PrismaClient, User } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { useSWRConfig } from "swr";

export default async function calendarsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { comment }: { comment: Comment } = JSON.parse(req.body);
  const prisma = new PrismaClient();

  const calendars = await prisma.comment.create({
    data: comment,
  });
  res.status(200).json(calendars);
}

export const useSaveComment = () => {
  const { mutate } = useSWRConfig();
  const saveComment = async (
    comment: Prisma.CommentCreateInput,
    calendar: Calendar & {
      comments: Comment[];
    },
    user: User
  ) => {
    try {
      mutate(
        `/api/calendars/${calendar.id}`,
        {
          ...calendar,
          comments: [
            {
              ...comment,
              user,
              createdAt: new Date(),
            },
            ...calendar.comments,
          ],
        },
        false
      );

      await fetch(`/api/calendars/${calendar.id}}/comments/add`, {
        method: "POST",
        body: JSON.stringify({ comment }),
      });

      await mutate(`/api/calendars/${calendar.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return saveComment;
};
