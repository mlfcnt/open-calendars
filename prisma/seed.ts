import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

const AMOUNT_OF_CALS_TO_CREATE = 10;

const CREATE_CATEGORIES = true;
const CREATE_CALENDARS = false;

const categoriesToCreate = [
  "Movie",
  "TV Show",
  "Sports",
  "Music",
  "Video Games",
  "Live shows",
  "Events",
  "Other",
];

const generateFakeCalendar = async () => {
  const categoryForThisCalendar = await prisma.category.findFirst({
    where: {
      name: faker.random.arrayElement(categoriesToCreate),
    },
    select: {
      id: true,
    },
  });

  return {
    name: faker.random.words(),
    url: "https://calendar.google.com/calendar/embed?src=otpef10f3afpfs6u3ljcu2fsa0%40group.calendar.google.com&ctz=Europe%2FParis",
    description: faker.random.words(),
    category: {
      connect: {
        id: categoryForThisCalendar?.id,
      },
    },
  };
};

async function main() {
  console.log(`Start seeding ...`);
  if (CREATE_CATEGORIES) {
    for (const c of categoriesToCreate) {
      const category = await prisma.category.create({
        data: {
          name: c,
        },
      });
      console.log(`Created category with id: ${category.id}`);
    }
  }
  if (CREATE_CALENDARS) {
    for (let index = 0; index < AMOUNT_OF_CALS_TO_CREATE; index++) {
      const calendars = await prisma.calendar.create({
        data: await generateFakeCalendar(),
      });
      console.log(`Created calendar with id: ${calendars.id}`);
    }
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
