import React from "react";
import { Story, Meta } from "@storybook/react";
import VideoBanner1 from "./VideoBanner1";

export default {
  title: "Prelems/Video Banner1",
  component: VideoBanner1,
} as Meta;

const Template: Story = (args) => <VideoBanner1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: VideoBanner1.defaultProps.content,
  authoringHelper: VideoBanner1.defaultProps.authoringHelper,
  analytics: VideoBanner1.defaultProps.analytics,
};
