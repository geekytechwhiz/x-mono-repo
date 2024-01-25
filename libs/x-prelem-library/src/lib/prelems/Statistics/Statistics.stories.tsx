import React from "react";
import { Story, Meta } from "@storybook/react";
import Statistics from "./Statistics";

export default {
  title: "Prelems/Statistics",
  component: Statistics,
} as Meta;

const Template: Story = (args) => <Statistics {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Statistics.defaultProps.content,
  authoringHelper: Statistics.defaultProps.authoringHelper,
  analytics: Statistics.defaultProps.analytics,
};
