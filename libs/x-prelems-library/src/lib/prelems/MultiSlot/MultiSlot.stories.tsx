import React from "react";
import { Story, Meta } from "@storybook/react";
import MultiSlot from "./MultiSlot";

export default {
  title: "Prelems/Multi Slot",
  component: MultiSlot,
} as Meta;

const Template: Story = (args) => <MultiSlot {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: MultiSlot.defaultProps.content,
  authoringHelper: MultiSlot.defaultProps.authoringHelper,
  analytics: MultiSlot.defaultProps.analytics,
  secondaryArgs: MultiSlot.defaultProps.secondaryArgs,
};
