import React from "react";
import { Story, Meta } from "@storybook/react";
import DynamicPrelemOne from "./DynamicPrelemOne";

export default {
  title: "Prelems/Dynamic Prelem One",
  component: DynamicPrelemOne,
} as Meta;

const Template: Story = (args) => <DynamicPrelemOne {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: DynamicPrelemOne.defaultProps.content,
  authoringHelper: DynamicPrelemOne.defaultProps.authoringHelper,
  analytics: DynamicPrelemOne.defaultProps.analytics,
  secondaryArgs: DynamicPrelemOne.defaultProps.secondaryArgs,
};
