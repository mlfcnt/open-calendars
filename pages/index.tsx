import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { PreviewCard } from "../components/PreviewCard";
import { CalendarSearch } from "../components/CalendarSearch";
import { useCategories } from "./api/categories";
import { useCalendars } from "./api/calendars";
import { Loading } from "../components/Loading";

const Home: NextPage = () => {
  const { data: calendars = [] } = useCalendars();
  const { data: categories = [] } = useCategories();

  if (!calendars.length) return <Loading />;

  return (
    <div>
      <header>
        <h1 className={styles.title}>open-calendars</h1>
        <h2>Easily find and share your calendars</h2>
        <CalendarSearch />
      </header>
      <main>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <PreviewCard
              key={category.id}
              category={category}
              calendars={calendars?.filter((x) => x.categoryId === category.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
