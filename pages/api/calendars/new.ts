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

const validateCalendar = (calendar: Prisma.CalendarCreateInput) => {
  const regex =
    /https:\/\/calendar\.google\.com\/calendar\/u\/0\?cid=([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
  const match = regex.exec(calendar.url);
  if (!match) {
    alert(
      "Invalid calendar URL, url should look like this : \nhttps://calendar.google.com/calendar/u/0?cid={{calendarId}}"
    );
    return;
  } else {
    return match[1];
  }
};

export const saveCalendar = async (calendar: Prisma.CalendarCreateInput) => {
  const isValid = validateCalendar(calendar);
  return (
    isValid &&
    fetch("/api/calendars/new", {
      method: "POST",
      body: JSON.stringify(calendar),
    })
  );
};
