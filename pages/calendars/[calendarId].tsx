import { useRouter } from "next/router";
import { Loading } from "../../components/Loading";
import { useCalendar } from "../api/calendars/[calendarId]";
import { MainTemplate } from "../../components/templates/MainTemplate";
import { useSession } from "next-auth/react";

import { updateCalendar } from "../api/calendars/update";

const Calendar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const userIsLoggedIn = !!session?.user;
  const { calendarId } = router.query;
  const { data: calendar } = useCalendar(calendarId);

  if (typeof calendarId !== "string" || !calendar) return <Loading />;

  const handleClick = () => {
    if (!userIsLoggedIn) {
      alert("You must be loggin in to vote");
      return;
    }
    updateCalendar({
      starredByUsers: {
        connect: {
          calendarId_userId: {
            calendarId,
            userId: session.user as string,
          },
        },
      },
    });
  };

  return (
    <MainTemplate showSearch={false} showAddCalendar={false}>
      <header>
        <h1>{calendar.name}</h1>
        <h3>{calendar.description}</h3>
        <p style={{ cursor: "pointer" }} onClick={handleClick}>
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
