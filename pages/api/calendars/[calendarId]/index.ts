// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import useSWR from "swr";
import { PrismaClient } from "@prisma/client";
import { Calendar, StarsOnCalendars, Comment, User } from ".prisma/client";
import { fetcher } from "../../../../lib/fetcher";

export default async function calendarHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { calendarId },
  } = req;
  if (!calendarId) return {};
  const prisma = new PrismaClient();
  const calendar = await prisma.calendar.findUnique({
    where: {
      id: Array.isArray(calendarId) ? calendarId[0] : calendarId,
    },
    include: {
      starredByUsers: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      },
    },
  });
  res.status(200).json(calendar);
}

export const useCalendar = (calendarId: string | string[] | undefined) =>
  useSWR<
    Calendar & {
      starredByUsers: StarsOnCalendars[];
      comments: (Comment & {
        user: User;
      })[];
    }
  >(calendarId ? `/api/calendars/${calendarId}` : null, fetcher);
