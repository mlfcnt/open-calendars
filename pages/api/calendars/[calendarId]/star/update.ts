// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Calendar, PrismaClient, StarsOnCalendars } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { useSWRConfig } from "swr";

export default async function calendarsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { calendarId, userId } = JSON.parse(req.body);
  const prisma = new PrismaClient();

  const isAlreadyStarred = await prisma.calendar.findUnique({
    where: {
      id: calendarId,
    },
    include: {
      starredByUsers: {
        where: {
          userId,
          calendarId,
        },
        select: {
          id: true,
          calendarId: true,
          userId: true,
        },
      },
    },
  });
  if (isAlreadyStarred?.starredByUsers?.length) {
    const calendars = await prisma.starsOnCalendars.delete({
      where: {
        id: isAlreadyStarred.starredByUsers[0].id,
      },
    });
    res.status(200).json(calendars);
  } else {
    const calendars = await prisma.calendar.update({
      where: {
        id: calendarId,
      },
      data: {
        starredByUsers: {
          connectOrCreate: {
            where: {
              calendarId_userId: {
                calendarId,
                userId: userId,
              },
            },
            create: {
              userId: userId,
              assignedBy: userId,
            },
          },
        },
      },
    });
    res.status(200).json(calendars);
  }
}

export const useUpdateCalendarStars = () => {
  const { mutate } = useSWRConfig();

  const updateCalendarStars = async (
    calendar: Calendar & {
      starredByUsers: StarsOnCalendars[];
    },
    calendarId: string,
    userId: string
  ) => {
    try {
      const isAlreadyStarred = calendar.starredByUsers.some(
        (x) => x.calendarId === calendarId && x.userId === userId
      );

      //TODO il faudrait aussi invalider /api/calendars/

      if (!isAlreadyStarred) {
        mutate(
          `/api/calendars/${calendarId}`,
          {
            ...calendar,
            starredByUsers: [
              ...calendar.starredByUsers,
              {
                calendarId,
                userId,
              },
            ],
          },
          false
        );
      } else {
        mutate(
          `/api/calendars/${calendarId}`,
          {
            ...calendar,
            starredByUsers: calendar.starredByUsers.filter(
              (x) => x.calendarId !== calendarId && x.userId !== userId
            ),
          },
          false
        );
      }
      await fetch(`/api/calendars/${calendarId}}/star/update`, {
        method: "POST",
        body: JSON.stringify({ calendarId, userId }),
      });
      await mutate(`/api/calendars/${calendarId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return updateCalendarStars;
};
