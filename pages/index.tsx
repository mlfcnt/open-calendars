import type { NextPage } from "next";
import { PreviewCard } from "../components/PreviewCard";
import { useCategories } from "./api/categories";
import { useCalendars } from "./api/calendars";
import { Loading } from "../components/Loading";
import { MainTemplate } from "../components/templates/MainTemplate";

const Home: NextPage = () => {
  const { data: calendars = [] } = useCalendars();
  const { data: categories = [] } = useCategories();

  if (!calendars) return <Loading />;

  return (
    <MainTemplate>
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
    </MainTemplate>
  );
};

export default Home;
