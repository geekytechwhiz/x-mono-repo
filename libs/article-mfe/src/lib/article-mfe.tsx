import { ThemeProvider } from "@mui/material/styles";
import { fetchContentData } from "@platformx/authoring-apis";
import { ErrorBoundary, PrelemTheme, getSecondaryArgs } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { ArticleMfeProps } from "./article-mfe.types";
import { ArticleComponent } from "./components/ArticleComponent/ArticleComponent";

export function ArticleMfe({ contentType, host, id, langCode }: ArticleMfeProps) {
  const [pageData, setPageData] = useState({} as any);

  useEffect(() => {
    if (contentType && id)
      fetchContentData(contentType, id, langCode, host).then((res) => {
        setPageData(res?.data?.data?.fetchArticleContent);
      });
  }, [contentType, host, id, langCode]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={PrelemTheme}>
        <ArticleComponent
          pageData={pageData}
          secondaryArgs={getSecondaryArgs(langCode, contentType, host)}
        />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default ArticleMfe;
