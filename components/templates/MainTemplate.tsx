import React from "react";
import { CalendarSearch } from "../CalendarSearch";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { SignInSignOut } from "../SignInSignOut";
import AddCalendar from "../AddCalendar";

type Props = {
  children: React.ReactNode;
  showAddCalendar?: boolean;
  showSearch?: boolean;
};

export const MainTemplate = ({
  children,
  showAddCalendar = true,
  showSearch = true,
}: Props) => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  return (
    <div>
      <header>
        <h1 className={styles.title}>open-calendars</h1>
        <h2>Easily find and share your calendars</h2>
        <SignInSignOut />
        {showSearch && <CalendarSearch />}
        {showAddCalendar && <AddCalendar />}
      </header>
      <main>{children}</main>
      {!isHome && (
        <footer style={{ marginTop: "100px" }}>
          <Link href={"/"}>
            <a>⬅️ Back to home</a>
          </Link>
        </footer>
      )}
    </div>
  );
};
