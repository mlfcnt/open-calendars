// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import useSWR from "swr";
import { PrismaClient } from "@prisma/client";
import { fetcher } from "../../../../lib/fetcher";
import { Calendar, Category, StarsOnCalendars } from ".prisma/client";

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
    where: {
      categoryId: Array.isArray(categoryId) ? categoryId[0] : categoryId,
    },
    include: {
      starredByUsers: true,
      category: true,
    },
    orderBy: {
      starredByUsers: {
        _count: "desc",
      },
    },
  });
  res.status(200).json(calendars);
}

export const useAllCalendarsForCategory = (
  categoryId: string | string[] | undefined
) =>
  useSWR<
    (Calendar & {
      category: Category;
      starredByUsers: StarsOnCalendars[];
    })[]
  >(`/api/calendars/all/${categoryId}`, fetcher);
