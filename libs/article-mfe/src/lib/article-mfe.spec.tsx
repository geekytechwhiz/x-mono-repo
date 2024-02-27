import { render } from "@testing-library/react";

import ArticleMfe from "./article-mfe";

describe("ArticleMfe", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ArticleMfe />);
    expect(baseElement).toBeTruthy();
  });
});
