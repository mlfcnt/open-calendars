import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { Calendar, Category, StarsOnCalendars } from ".prisma/client";

type Props = {
  category: Category;
  calendars: (Calendar & { starredByUsers: StarsOnCalendars[] })[];

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
          <a href={calendar.url} target="_blank" rel="noreferrer">
            <span> 📆</span>
          </a>
          <span> | {calendar.starredByUsers.length}⭐</span>
        </div>
      ))}
      {displayShowAllBtn && (
        <Link href={`/calendars/all?categoryId=${category.id}`}>
          <a>
            <button style={{ marginTop: "20px" }}>
              See more from {category.name}
            </button>
          </a>
        </Link>
      )}
    </div>
  );
};
