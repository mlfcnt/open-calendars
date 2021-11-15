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
  const category = await prisma.category.findUnique({
    where: {
      id: Array.isArray(categoryId) ? categoryId[0] : categoryId,
    },
  });
  res.status(200).json({ calendars, category });
}

export const useAllCalendarsForCategory = (
  categoryId: string | string[] | undefined
) =>
  useSWR<{
    calendars: (Calendar & {
      category: Category;
      starredByUsers: StarsOnCalendars[];
    })[];
    category: Category;
  }>(`/api/calendars/all/${categoryId}`, fetcher);
