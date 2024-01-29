import React from "react";
import { Story, Meta } from "@storybook/react";
import DynamicPrelem from "./DynamicPrelem";

export default {
  title: "Prelems/Dynamic Prelem",
  component: DynamicPrelem,
} as Meta;

const Template: Story = (args) => <DynamicPrelem {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: DynamicPrelem.defaultProps.content,
  authoringHelper: DynamicPrelem.defaultProps.authoringHelper,
  analytics: DynamicPrelem.defaultProps.analytics,
  secondaryArgs: DynamicPrelem.defaultProps.secondaryArgs,
};
