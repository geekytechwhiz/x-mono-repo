import { render } from "@testing-library/react";

import XPoll from "./x-poll";

describe("XPoll", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<XPoll />);
    expect(baseElement).toBeTruthy();
  });
});
