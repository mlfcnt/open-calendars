// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { PrismaClient } from "@prisma/client";
import { Calendar } from ".prisma/client";

export default async function calendarsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const calendars = await prisma.calendar.findMany({
    orderBy: {
      stars: "desc",
    },
  });
  res.status(200).json(calendars);
}

export const useCalendars = () => useSWR<Calendar[]>("/api/calendars", fetcher);
