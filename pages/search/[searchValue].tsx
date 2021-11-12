import React from "react";
import { useRouter } from "next/router";
import { useSearchCalendars } from "../api/search/[searchValue]";
import { PreviewCard } from "../../components/PreviewCard";
import { Loading } from "../../components/Loading";
import { Category } from ".prisma/client";
import Link from "next/link";

const Search = () => {
  const router = useRouter();
  const { searchValue } = router.query;
  const { data: searchResults } = useSearchCalendars(searchValue);
  if (!searchResults) return <Loading />;

  if (!searchResults.length)
    return (
      <>
        <p>No calendars with a name containing {searchValue} found</p>{" "}
        <Link href={"/"}>
          <a>Back to home</a>
        </Link>
      </>
    );

  const distinctCategories = searchResults.reduce((categories, calendar) => {
    if (!categories.some((x) => x.id === calendar.category.id)) {
      categories.push(calendar.category);
    }
    return categories;
  }, [] as Category[]);

  return distinctCategories.map((category) => (
    <>
      <PreviewCard
        key={category.id}
        category={category}
        calendars={searchResults?.filter((x) => x.category.id === category.id)}
        displayShowAllBtn={false}
      />
      <Link href={"/"}>
        <a>Back to home</a>
      </Link>
    </>
  ));
};
export default Search;
