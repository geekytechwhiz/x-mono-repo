import { Box } from "@mui/material";
import { fetchContentData } from "@platformx/authoring-apis";
import { CONTENT_TYPE, ErrorBoundary, getSecondaryArgs } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { QuizComponent } from "./components/QuizComponent";

export function QuizMfe() {
  const [pageData, setPageData] = useState({} as any);
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
  });
  useEffect(() => {
    fetchContentData(CONTENT_TYPE.QUIZ, CONTENT_TYPE.QUIZ, "en", "localhost").then((res) => {
      setPageData(res?.data?.data?.fetchArticleContent);
    });
  }, []);

  return (
    <Box ref={ref}>
      <ErrorBoundary>
        <QuizComponent
          pageData={pageData}
          secondaryArgs={getSecondaryArgs("en", CONTENT_TYPE.QUIZ, "localhost")}
        />
      </ErrorBoundary>
    </Box>
  );
}

export default QuizMfe;
