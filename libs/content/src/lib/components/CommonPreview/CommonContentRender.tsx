/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AUTH_INFO, PrelemTheme } from "@platformx/utilities";
import React, { useEffect, useState } from "react";
import { Mapping } from "../../utils/Mapper";

const mappingDynamicInstance = {};
Object.keys(Mapping).map((item) => {
  mappingDynamicInstance[item] = React.lazy(() =>
    import(`@platformx/x-prelems-library`).then((module) => ({
      default: module[Mapping[item]],
    })),
  );
  return mappingDynamicInstance;
});

const CommonContentRender = () => {
  const currentItem = localStorage.getItem("preview");
  const currentContent = currentItem && JSON.parse(currentItem);
  const ContentType = mappingDynamicInstance[currentContent?.contentType];
  const [previewObject, setPreviewObject] = useState({
    options_compound_fields: "",
    contentType: "",
  });
  // console.log("yess called", currentContent);

  useEffect(() => {
    if (Object.keys(currentContent).length > 0) {
      setPreviewObject(currentContent);
    } else {
      window.history.back();
    }
    // console.log("yesss ...", currentContent);
  }, []);

  const prelemAuthoringHelper = {
    isAuthoring: true,
  };
  const secondaryArgs = {
    gcpUrl: AUTH_INFO.gcpUri,
    bucketName: AUTH_INFO.gcpBucketName,
  };

  return (
    <Box>
      <ThemeProvider theme={PrelemTheme}>
        <ContentType
          showRecentArticles={false}
          content={previewObject}
          showLoading={false}
          results={previewObject.options_compound_fields}
          enablePreview
          authoringHelper={prelemAuthoringHelper}
          secondaryArgs={secondaryArgs}
        />
      </ThemeProvider>
    </Box>
  );
};
export default CommonContentRender;
