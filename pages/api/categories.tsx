// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { PrismaClient } from "@prisma/client";
import { Category } from ".prisma/client";

export default async function calendarsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);
}

export const useCategories = () =>
  useSWR<Category[]>("/api/categories", fetcher);
