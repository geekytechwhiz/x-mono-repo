import { render } from "@testing-library/react";

import QuizMfe from "./quiz-mfe";

describe("QuizMfe", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<QuizMfe />);
    expect(baseElement).toBeTruthy();
  });
});
