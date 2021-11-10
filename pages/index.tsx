import type { NextPage } from "next";
import { categories } from "../fixtures/categories";
import styles from "../styles/Home.module.css";
import { groupBy } from "lodash";
import { calendars } from "../fixtures/calendars";
import { PreviewCard } from "../components/PreviewCard";

const Home: NextPage = () => {
  const grouppedByCategories = groupBy(calendars, "categoryId");
  return (
    <div>
      <header>
        <h1 className={styles.title}>open-calendars</h1>
        <h2>Easily find and share your calendars</h2>
      </header>
      <main>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <PreviewCard
              key={category.id}
              category={category}
              calendars={grouppedByCategories[category.id]}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
