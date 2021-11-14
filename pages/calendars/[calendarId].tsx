import { useRouter } from "next/router";
import { Loading } from "../../components/Loading";
import { useCalendar } from "../api/calendars/[calendarId]";
import { MainTemplate } from "../../components/templates/MainTemplate";
import { useSession } from "next-auth/react";
import { useUpdateCalendarStars } from "../api/calendars/update/star";

const Calendar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const { calendarId } = router.query;
  const { data: calendar } = useCalendar(calendarId);
  const updateCalendarStars = useUpdateCalendarStars();

  if (typeof calendarId !== "string" || !calendar) return <Loading />;

  const handleStarClick = async () => {
    if (!userId) {
      alert("You must be loggin in to vote");
      return;
    }
    await updateCalendarStars(calendar, calendarId, userId);
  };

  return (
    <MainTemplate showSearch={false} showAddCalendar={false}>
      <header>
        <h1>{calendar.name}</h1>
        <h3>{calendar.description}</h3>
        <p style={{ cursor: "pointer" }} onClick={handleStarClick}>
          {calendar.starredByUsers.length} ⭐
        </p>
        <a href={calendar.url} target="_blank" rel="noreferrer">
          <button>Google calendar</button>
        </a>
      </header>
    </MainTemplate>
  );
};

export default Calendar;
