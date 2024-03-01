import type { Meta, StoryObj } from "@storybook/react";
import WorkflowStepper from "./WorkflowStepper";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

const meta: Meta<typeof WorkflowStepper> = {
  component: WorkflowStepper,
  title: "WorkflowStepper",
};
export default meta;
type Story = StoryObj<typeof WorkflowStepper>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to WorkflowStepper!/gi)).toBeTruthy();
  },
};
