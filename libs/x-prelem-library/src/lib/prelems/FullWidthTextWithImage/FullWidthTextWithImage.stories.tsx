import React from "react";
import { Story, Meta } from "@storybook/react";
import FullWidthTextWithImage from "./FullWidthTextWithImage";

export default {
  title: "Prelems/FullWidthTextWithImage",
  component: FullWidthTextWithImage,
} as Meta;

const Template: Story = (args) => <FullWidthTextWithImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: FullWidthTextWithImage.defaultProps.content,
  authoringHelper: FullWidthTextWithImage.defaultProps.authoringHelper,
  analytics: FullWidthTextWithImage.defaultProps.analytics,
  secondaryArgs: FullWidthTextWithImage.defaultProps.secondaryArgs,
};
