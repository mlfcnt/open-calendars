// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import useSWR from "swr";
import { PrismaClient } from "@prisma/client";
import { fetcher } from "../../../../lib/fetcher";
import { CalendarWithCategory } from "../../../../types";

export default async function calendarsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { categoryId },
  } = req;
  if (!categoryId) return {};
  const prisma = new PrismaClient();
  const calendars = await prisma.calendar.findMany({
    orderBy: {
      stars: "desc",
    },
    where: {
      categoryId: Array.isArray(categoryId) ? categoryId[0] : categoryId,
    },
    select: {
      id: true,
      name: true,
      stars: true,
      url: true,
      category: true,
      description: true,
    },
  });
  res.status(200).json(calendars);
}

export const useAllCalendarsForCategory = (
  categoryId: string | string[] | undefined
) =>
  useSWR<CalendarWithCategory[]>(`/api/calendars/all/${categoryId}`, fetcher);
