import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export const CalendarSearch = () => {
  const router = useRouter();
  const [value, setValue] = useState<string | undefined>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search for a calendar"
        name="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
