import getConfig from "next/config";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { nullToObject } from "../../utils/helperFunctions";
import { PollComponentProps } from "./Poll.types";
import { usePollApi } from "./hooks/usePollApi";

const PollPrelem = dynamic<any>(
  () => import("@platformx/x-prelems-library").then((mod) => mod.Poll),
  {
    ssr: false,
  },
);

export const PollComponent = ({ pageData, secondaryArgs }: PollComponentProps) => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
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
        <PollPrelem
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
            isSeoEnabled: pageData?.settings?.seo_blockIndexing,
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
