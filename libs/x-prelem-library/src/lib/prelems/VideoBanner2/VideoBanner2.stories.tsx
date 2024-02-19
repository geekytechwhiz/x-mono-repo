import React from "react";
import { Story, Meta } from "@storybook/react";
import VideoBanner2 from "./VideoBanner2";

export default {
  title: "Prelems/Video Banner2",
  component: VideoBanner2,
} as Meta;

const Template: Story = (args) => <VideoBanner2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: VideoBanner2.defaultProps.content,
  authoringHelper: VideoBanner2.defaultProps.authoringHelper,
  analytics: VideoBanner2.defaultProps.analytics,
  secondaryArgs: VideoBanner2.defaultProps.secondaryArgs,
};
