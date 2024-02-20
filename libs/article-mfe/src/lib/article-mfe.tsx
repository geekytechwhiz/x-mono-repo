/* eslint-disable-next-line */

import { fetchContentData } from "@platformx/authoring-apis";
import { getSecondaryArgs } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { ArticleComponent } from "./components/ArticleComponent/ArticleComponent";

export function ArticleMfe() {
  const [pageData, setPageData] = useState({} as any);

  useEffect(() => {
    fetchContentData("article", "article", "en", "localhost").then((res) => {
      setPageData(res?.data?.data?.fetchArticleContent);
    });
  }, []);

  return (
    <ArticleComponent
      pageData={pageData}
      secondaryArgs={getSecondaryArgs("en", "article", "localhost")}
    />
  );
}

export default ArticleMfe;
