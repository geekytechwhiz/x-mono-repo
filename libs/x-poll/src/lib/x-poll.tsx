import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { fetchContentData } from "@platformx/authoring-apis";
import { ErrorBoundary, PrelemTheme, getSecondaryArgs } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PollComponent } from "./components/PollComponent";
import { XPollProps } from "./x-poll.types";

export function XPoll({ contentId, langCode }: XPollProps) {
  const [pageData, setPageData] = useState({} as any);

  useEffect(() => {
    if (contentId)
      fetchContentData("poll", contentId, langCode, process.env.NX_AUTHOR_URI).then((res) => {
        setPageData(res?.data?.data?.fetchPoll);
      });
  }, [contentId]);
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
            secondaryArgs={getSecondaryArgs(langCode, "poll", process.env.NX_AUTHOR_URI)}
          />
        </ThemeProvider>
      </ErrorBoundary>
    </Box>
  );
}

export default XPoll;
