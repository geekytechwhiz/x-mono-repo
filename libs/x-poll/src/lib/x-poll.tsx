import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { fetchContentData } from "@platformx/authoring-apis";
import { ErrorBoundary, PrelemTheme, getSecondaryArgs } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PollComponent } from "./components/PollComponent";
import { XPollProps } from "./x-poll.types";

export function XPoll({ contentType, id, langCode, host }: XPollProps) {
  const [pageData, setPageData] = useState({} as any);

  useEffect(() => {
    if (contentType && id)
      fetchContentData(contentType, id, langCode, host).then((res) => {
        setPageData(res?.data?.data?.fetchPoll);
      });
  }, [contentType, id]);
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <Box ref={ref}>
      <ErrorBoundary>
        <ThemeProvider theme={PrelemTheme}>
          <PollComponent
            pageData={pageData}
            secondaryArgs={getSecondaryArgs(langCode, contentType, host)}
          />
        </ThemeProvider>
      </ErrorBoundary>
    </Box>
  );
}

export default XPoll;
