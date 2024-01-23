import React from "react";
import { Story, Meta } from "@storybook/react";
import Services1 from "./Services1";

export default {
  title: "Prelems/Service Cards",
  component: Services1,
} as Meta;

const Template: Story = (args) => <Services1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Services1.defaultProps.content,
  authoringHelper: Services1.defaultProps.authoringHelper,
  analytics: Services1.defaultProps.analytics,
  secondaryArgs: Services1.defaultProps.secondaryArgs,
};
