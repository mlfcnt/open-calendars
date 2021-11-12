// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { PrismaClient } from "@prisma/client";
import { Calendar } from ".prisma/client";

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
  });
  res.status(200).json(calendar);
}

export const useCalendar = (calendarId: string | string[] | undefined) =>
  useSWR<Calendar>(calendarId ? `/api/calendars/${calendarId}` : null, fetcher);
