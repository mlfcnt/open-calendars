// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Calendar, Comment, PrismaClient, User } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { useSWRConfig } from "swr";

export default async function calendarsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { comment }: { comment: Comment } = JSON.parse(req.body);
  const prisma = new PrismaClient();

  const calendars = await prisma.comment.delete({
    where: {
      id: comment.id,
    },
  });
  res.status(200).json(calendars);
}

export const useDeleteComment = () => {
  const { mutate } = useSWRConfig();
  const deleteComment = async (
    comment: Comment,
    calendar: Calendar & {
      comments: Comment[];
    }
  ) => {
    try {
      mutate(
        `/api/calendars/${calendar.id}`,
        {
          ...calendar,
          comments: calendar.comments.filter((x) => x.id !== comment.id),
        },
        false
      );

      await fetch(`/api/calendars/${calendar.id}}/comments/delete`, {
        method: "POST",
        body: JSON.stringify({ comment }),
      });

      await mutate(`/api/calendars/${calendar.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return deleteComment;
};
