import { Box, ThemeProvider } from "@mui/material";
import { fetchContentData } from "@platformx/authoring-apis";
import { ErrorBoundary, PrelemTheme, getSecondaryArgs } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { QuizComponent } from "./components/QuizComponent";
import { QuizMfeProps } from "./quiz-mfe.types";

export function QuizMfe({ contentId, langCode }: QuizMfeProps) {
  const [pageData, setPageData] = useState({} as any);

  useEffect(() => {
    if (contentId) {
      fetchContentData("quiz", contentId, langCode, process.env.NX_AUTHOR_URI).then((res) => {
        setPageData(res?.data?.data?.fetchQuizContent);
      });
    }
  }, [contentId]);
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <Box ref={ref}>
      <ErrorBoundary>
        <ThemeProvider theme={PrelemTheme}>
          <QuizComponent
            pageData={pageData}
            secondaryArgs={getSecondaryArgs(langCode, "quiz", process.env.NX_AUTHOR_URI)}
          />
        </ThemeProvider>
      </ErrorBoundary>
    </Box>
  );
}

export default QuizMfe;
