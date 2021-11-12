import { useRouter } from "next/router";
import Link from "next/link";
import { Loading } from "../../components/Loading";
import { useCalendar } from "../api/calendars/[calendarId]";

const Calendar = () => {
  const router = useRouter();
  const { calendarId } = router.query;
  const { data: calendar } = useCalendar(calendarId);
  if (typeof calendarId !== "string" || !calendar) return <Loading />;

  return (
    <div>
      <header>
        <h1>{calendar.name}</h1>
        {/* <h2>{calendar.description}</h2> */}
        <p>{calendar.stars} ⭐</p>
      </header>
      <Link href={"/"}>
        <a>Back to home</a>
      </Link>
    </div>
  );
};

export default Calendar;
