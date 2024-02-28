import { usePollApi } from "@platformx/authoring-apis";
import { nullToObject } from "@platformx/utilities";
import { Poll } from "@platformx/x-prelems-library";
import { useEffect } from "react";
import { PollComponentProps } from "./Poll.types";

export const PollComponent = ({ pageData, secondaryArgs }: PollComponentProps) => {
  // const { publicRuntimeConfig = {} } = getConfig() || {};
  const publicRuntimeConfig = process.env;
  const { loading, results, getPoll, onSubmit } = usePollApi();

  useEffect(() => {
    const takenPoles = JSON.parse(localStorage.getItem("TakenPoles") || "[]");
    if (takenPoles?.includes(pageData?.page)) {
      getPoll(publicRuntimeConfig, pageData);
    }
  }, []);
  return (
    <>
      {Object.keys(nullToObject(pageData)).length > 0 && (
        <Poll
          results={results}
          content={pageData}
          onSubmit={(pollData) => onSubmit(pollData, publicRuntimeConfig, pageData)}
          showLoading={loading}
          analytics={{
            pageId: pageData?.page,
            pageTitle: pageData?.title,
            pageDesc: pageData?.description,
            pageTags: pageData?.settings?.keywords?.join(", ") || "",
            isAuthoring: false,
            isSeoEnabled: pageData?.settings?.seo_blockIndexing || false,
            isAnalyticsEnabled: pageData?.analytics_enable,
          }}
          authoringHelper={{
            isAuthoring: false,
          }}
          secondaryArgs={secondaryArgs}
        />
      )}
    </>
  );
};
