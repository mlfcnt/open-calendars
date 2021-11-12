// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { Calendar, Category } from "@prisma/client";

export default async function calendarHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { searchValue },
  } = req;
  const prisma = new PrismaClient();
  const result = await prisma.calendar.findMany({
    where: {
      name: {
        contains: Array.isArray(searchValue) ? searchValue[0] : searchValue,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      stars: true,
      url: true,
      category: true,
    },
  });
  res.status(200).json(result);
}

type UseSearchCalendarsPayload = {
  category: Category;
} & Calendar;

export const useSearchCalendars = (
  searchValue: string | string[] | undefined
) => useSWR<UseSearchCalendarsPayload[]>(`/api/search/${searchValue}`, fetcher);
