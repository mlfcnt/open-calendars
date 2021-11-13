// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Prisma } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function calendarsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { calendarId, ...body } = JSON.parse(req.body);
  const prisma = new PrismaClient();
  const calendars = await prisma.calendar.update({
    where: {
      id: calendarId,
    },
    data: JSON.parse(body),
  });
  res.status(200).json(calendars);
}

export const updateCalendar = async (calendar: Prisma.CalendarUpdateInput) => {
  return fetch("/api/calendars/update", {
    method: "POST",
    body: JSON.stringify(calendar),
  });
};
