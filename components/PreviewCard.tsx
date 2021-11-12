import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { Calendar, Category } from ".prisma/client";

type Props = {
  category: Category;
  calendars: Calendar[];
  displayShowAllBtn?: boolean;
};

export const PreviewCard = ({
  category,
  calendars,
  displayShowAllBtn = true,
}: Props) => {
  return (
    <div key={category.id} className={styles.card}>
      <h2>{category.name}</h2>
      {calendars?.map((calendar) => (
        <div style={{ display: "block" }} key={calendar.id}>
          <Link href={`/calendars/${calendar.id}`}>
            <a>{calendar.name}</a>
          </Link>
          <span> | {calendar.stars}⭐</span>
        </div>
      ))}
      {displayShowAllBtn && <strong>Show all</strong>}
    </div>
  );
};
