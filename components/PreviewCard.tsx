import React from "react";
import { Calendar, Category } from "../types";
import styles from "./style.module.css";
import Link from "next/link";

type Props = {
  category: Category;
  calendars: Calendar[];
};

export const PreviewCard = ({ category, calendars }: Props) => {
  return (
    <div key={category.id} className={styles.card}>
      <h2>
        {category.name} {category.emoji}
      </h2>
      {calendars
        ?.sort((a, b) => b.stars - a.stars)
        .map((calendar) => (
          <div style={{ display: "block" }} key={calendar.id}>
            <Link href={`/calendars/${calendar.id}`}>
              <a>{calendar.name}</a>
            </Link>
            <span> | {calendar.stars}⭐</span>
          </div>
        ))}
      <strong>Show all</strong>
    </div>
  );
};
