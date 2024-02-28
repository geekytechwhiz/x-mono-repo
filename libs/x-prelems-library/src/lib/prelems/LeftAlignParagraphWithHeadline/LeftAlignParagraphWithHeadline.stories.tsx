import React from "react";
import { Story, Meta } from "@storybook/react";
import LeftAlignParagraphWithHeadline from "./LeftAlignParagraphWithHeadline";

export default {
  title: "Prelems/Left Align Paragraph With Headline",
  component: LeftAlignParagraphWithHeadline,
} as Meta;

const Template: Story = (args) => <LeftAlignParagraphWithHeadline {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: LeftAlignParagraphWithHeadline.defaultProps.content,
  authoringHelper: LeftAlignParagraphWithHeadline.defaultProps.authoringHelper,
  analytics: LeftAlignParagraphWithHeadline.defaultProps.analytics,
};
