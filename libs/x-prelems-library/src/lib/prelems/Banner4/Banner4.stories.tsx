import React from "react";
import { Story, Meta } from "@storybook/react";
import Banner4 from "./Banner4";

export default {
  title: "Prelems/Banner4",
  component: Banner4,
} as Meta;

const Template: Story = (args) => <Banner4 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Banner4.defaultProps.content,
  authoringHelper: Banner4.defaultProps.authoringHelper,
  analytics: Banner4.defaultProps.analytics,
  secondaryArgs: Banner4.defaultProps.secondaryArgs,
};
