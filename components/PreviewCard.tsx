import React from "react";
import { Calendar, Category } from "../types";

type Props = {
  category: Category;
  calendars: Calendar[];
};

export const PreviewCard = ({ category, calendars }: Props) => {
  return (
    <div key={category.id}>
      <h2>
        {category.name} {category.emoji}
      </h2>
      {calendars.map((calendar) => (
        <p key={calendar.id}>{calendar.name} </p>
      ))}
      <strong>Voir tous les calendriers {category.name}</strong>
    </div>
  );
};
