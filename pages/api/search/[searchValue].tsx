// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { Calendar, Category, StarsOnCalendars } from ".prisma/client";

export default async function calendarHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { searchValue },
  } = req;
  const prisma = new PrismaClient();
  const formattedSearchValue = Array.isArray(searchValue)
    ? searchValue[0]
    : searchValue;
  const result = await prisma.calendar.findMany({
    where: {
      OR: [
        {
          name: {
            contains: formattedSearchValue,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: formattedSearchValue,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      starredByUsers: true,
      category: true,
    },
  });
  res.status(200).json(result);
}

export const useSearchCalendars = (
  searchValue: string | string[] | undefined
) =>
  useSWR<
    (Calendar & {
      starredByUsers: StarsOnCalendars[];
      category: Category;
    })[]
  >(`/api/search/${searchValue}`, fetcher);
