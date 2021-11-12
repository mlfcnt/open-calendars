import { useRouter } from "next/router";
import Link from "next/link";
import { Loading } from "../../components/Loading";
import { useCalendar } from "../api/calendars/[calendarId]";
import { MainTemplate } from "../../components/templates/MainTemplate";

const Calendar = () => {
  const router = useRouter();
  const { calendarId } = router.query;
  const { data: calendar } = useCalendar(calendarId);
  if (typeof calendarId !== "string" || !calendar) return <Loading />;

  return (
    <MainTemplate>
      <header>
        <h1>{calendar.name}</h1>
        <h3>{calendar.description}</h3>
        <p>{calendar.stars} ⭐</p>
        <a href={calendar.url} target="_blank" rel="noreferrer">
          <button>Google calendar</button>
        </a>
      </header>
    </MainTemplate>
  );
};

export default Calendar;
