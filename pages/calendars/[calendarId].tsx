import { useRouter } from "next/router";
import { calendars } from "../../fixtures/calendars";
import Link from "next/link";

const Calendar = () => {
  const router = useRouter();
  const { calendarId } = router.query;
  if (typeof calendarId !== "string") return null;

  const calendar = calendars.find((x) => x.id === +calendarId);
  return (
    <div>
      <header>
        <h1>{calendar.name}</h1>
        <h2>{calendar.description}</h2>
        <p>{calendar.stars} ⭐</p>
      </header>
      <Link href={"/"}>
        <a>Back to home</a>
      </Link>
    </div>
  );
};

export default Calendar;
