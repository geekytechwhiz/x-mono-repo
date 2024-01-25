import React from "react";
import { Story, Meta } from "@storybook/react";
import MultiSlot2 from "./MultiSlot2";

export default {
  title: "Prelems/Multi Slot2",
  component: MultiSlot2,
} as Meta;

const Template: Story = (args) => <MultiSlot2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: MultiSlot2.defaultProps.content,
  authoringHelper: MultiSlot2.defaultProps.authoringHelper,
  analytics: MultiSlot2.defaultProps.analytics,
  secondaryArgs: MultiSlot2.defaultProps.secondaryArgs,
};
