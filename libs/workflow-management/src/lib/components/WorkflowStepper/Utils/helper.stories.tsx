import type { Meta, StoryObj } from "@storybook/react";
import { lineBreak } from "./helper";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

const meta: Meta<typeof lineBreak> = {
  component: lineBreak,
  title: "lineBreak",
};
export default meta;
type Story = StoryObj<typeof lineBreak>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to lineBreak!/gi)).toBeTruthy();
  },
};
