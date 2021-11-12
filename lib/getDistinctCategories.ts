import { Category } from ".prisma/client";
import { CalendarWithCategory } from "../types";

export const getDistinctCategories = (
  calendarsWithCategory: CalendarWithCategory[]
) =>
  calendarsWithCategory.reduce((categories, calendar) => {
    if (!categories.some((x) => x.id === calendar.category.id)) {
      categories.push(calendar.category);
    }
    return categories;
  }, [] as Category[]);
