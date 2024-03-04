import { Box } from "@mui/material";
import {
  contentReader,
  nullToArray,
  nullToObject,
  snowplowSchemaUrl,
} from "../../utils/helperFunctions";
import { useEffect, useState } from "react";
import { dynamicListHandle } from "../../dynamic/dynamicImport";
import getConfig from "next/config";

const { publicRuntimeConfig = {} } = getConfig() || {};
interface Children {
  PrelemTag: Array<string>;
  PrelemId: string;
  PrelemName: string;
  SeoEnabled: boolean;
  AnalyticsEnabled: boolean;
  DocumentPath: string;
  DocumentType: string;
  IsHidden: boolean;
  StructuredData: Object;
}

const PrelemComponent = (props: any = {}) => {
  const {
    myRefs = [],
    pageData = {},
    instances = {},
    prelemBaseEndpoint = {},
    site_host = "",
  } = props;
  const prelemCount = nullToArray(pageData?.Children).length;
  const [prelemChild, setPrelemChild] = useState({});

  const makeComponent = (arr = []) => {
    setPrelemChild(dynamicListHandle(arr));
  };

  useEffect(() => {
    if (prelemCount > 0) {
      makeComponent(pageData?.Children);
    }
  }, [prelemCount]);

  if (Object.keys(prelemChild).length > 0) {
    try {
      return nullToArray(pageData?.Children).map((item: Children, key: number) => {
        try {
          const Component: any = prelemChild[item?.PrelemId];
          const data = contentReader(item?.DocumentPath, pageData?.Content);
          const prelemContentProp = data;
          const analyticsEnabled = Boolean(
            pageData?.AnalyticsEnable &&
              item.AnalyticsEnabled &&
              Object.keys(nullToObject(instances)).length,
          );
          const prelemAnalyticsProp = {
            pageId: pageData?.Page,
            pageTitle: pageData?.Title,
            pageDesc: pageData?.PageSettings?.PageDescription || "",
            pageTags: pageData?.PageSettings?.PageTags?.join(", "),
            prelemId: item?.PrelemId,
            prelemTitle: item?.PrelemName,
            prelemTags: item?.PrelemTag?.join(", "),
            prelemPosition: key + 1,
            isAuthoring: false,
            isSeoEnabled: item?.SeoEnabled,
            isAnalyticsEnabled: analyticsEnabled,
          };
          const prelemAuthoringHelper = {
            //isAuthoring: true,
            //isSeoEnabled: true,
            //isAnalyticsEnabled: true,
            innerRef: myRefs.current[key],
            isModalShow: true,
          };

          // based on Analytics provier instance length we are setting prelem's analyticsEnabled true OR false
          //const mergedData = {...item, ...data, AnalyticsEnabled: analyticsEnabled };
          return (
            <Box
              id={`Prelem${key + 1}`}
              key={`Prelem-key${key + 1}`}
              // Style needs to be removed when we add logic for prelem padding in authoring.
              // sx={{
              //   paddingTop: (themeOptions) =>
              //     themeOptions.prelemPaddingTop.value,
              //   paddingBottom: (themeOptions) =>
              //     themeOptions.prelemPaddingBottom.value,
              // }}
            >
              {Component && data && (
                <Component
                  content={prelemContentProp}
                  analytics={prelemAnalyticsProp}
                  authoringHelper={prelemAuthoringHelper}
                  secondaryArgs={{
                    ...snowplowSchemaUrl(),
                    prelemBaseEndpoint,
                    gcpUrl: publicRuntimeConfig.NEXT_GCP_URL,
                    bucketName: publicRuntimeConfig.NEXT_BUCKET_NAME,
                    sitename: site_host,
                  }}
                />
              )}
            </Box>
          );
        } catch (e) {
          return <></>;
        }
      });
    } catch (e) {
      return <></>;
    }
  }
};

export default PrelemComponent;
