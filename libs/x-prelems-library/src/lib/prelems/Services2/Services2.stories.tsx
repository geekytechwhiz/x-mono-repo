import React from "react";
import { Story, Meta } from "@storybook/react";
import Services2 from "./Services2";

export default {
  title: "Prelems/Service Cards",
  component: Services2,
} as Meta;

const Template: Story = (args) => <Services2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Services2.defaultProps.content,
  authoringHelper: Services2.defaultProps.authoringHelper,
  analytics: Services2.defaultProps.analytics,
  secondaryArgs: Services2.defaultProps.secondaryArgs,
};
