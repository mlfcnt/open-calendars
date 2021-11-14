import React from "react";
import { useRouter } from "next/router";
import { useSearchCalendars } from "../api/search/[searchValue]";
import { PreviewCard } from "../../components/PreviewCard";
import { Loading } from "../../components/Loading";
import { MainTemplate } from "../../components/templates/MainTemplate";
import { getDistinctCategories } from "../../lib/getDistinctCategories";

const Search = () => {
  const router = useRouter();
  const { searchValue } = router.query;
  const { data: searchResults } = useSearchCalendars(searchValue);
  if (!searchResults) return <Loading />;

  if (!searchResults.length)
    return (
      <MainTemplate>
        <p>No calendars with a name containing {searchValue} found</p>{" "}
      </MainTemplate>
    );

  const distinctCategories = getDistinctCategories(searchResults);

  return (
    <MainTemplate>
      {distinctCategories.map((category) => (
        <PreviewCard
          key={category.id}
          category={category}
          calendars={searchResults?.filter(
            (x) => x.category.id === category.id
          )}
          displayShowAllBtn={false}
        />
      ))}
    </MainTemplate>
  );
};
export default Search;
