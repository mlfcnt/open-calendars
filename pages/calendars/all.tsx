import { useRouter } from "next/router";
import React from "react";
import { Loading } from "../../components/Loading";
import { PreviewCard } from "../../components/PreviewCard";
import { MainTemplate } from "../../components/templates/MainTemplate";
import { getDistinctCategories } from "../../lib/getDistinctCategories";
import { useAllCalendarsForCategory } from "../api/calendars/all/[categoryId]";

const All = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const { data: calendars } = useAllCalendarsForCategory(categoryId);
  if (!calendars) return <Loading />;

  const distinctCategories = getDistinctCategories(calendars);

  return (
    <MainTemplate>
      {distinctCategories.map((category) => (
        <>
          <PreviewCard
            key={category.id}
            category={category}
            calendars={calendars?.filter((x) => x.category.id === category.id)}
            displayShowAllBtn={false}
          />
        </>
      ))}
    </MainTemplate>
  );
};

export default All;
