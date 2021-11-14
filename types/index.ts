import { Calendar, Category } from ".prisma/client";

export type CalendarWithCategory = {
  category: Category;
} & Calendar;
