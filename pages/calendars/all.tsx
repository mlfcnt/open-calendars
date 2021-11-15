import { useRouter } from "next/router";
import React from "react";
import { Loading } from "../../components/Loading";
import { PreviewCard } from "../../components/PreviewCard";
import { MainTemplate } from "../../components/templates/MainTemplate";
import { useAllCalendarsForCategory } from "../api/calendars/all/[categoryId]";

const All = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const { data } = useAllCalendarsForCategory(categoryId);
  if (!data?.calendars) return <Loading />;

  return (
    <MainTemplate>
      <>
        <PreviewCard
          key={data.category?.id}
          category={data.category}
          calendars={data.calendars}
          displayShowAllBtn={false}
        />
      </>
    </MainTemplate>
  );
};

export default All;
