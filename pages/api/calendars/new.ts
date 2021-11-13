// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Prisma } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function calendarsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const prisma = new PrismaClient();
  const calendars = await prisma.calendar.create({
    data: JSON.parse(body),
  });
  res.status(200).json(calendars);
}

export const saveCalendar = async (category: Prisma.CalendarCreateInput) => {
  return fetch("/api/calendars/new", {
    method: "POST",
    body: JSON.stringify(category),
  });
};
