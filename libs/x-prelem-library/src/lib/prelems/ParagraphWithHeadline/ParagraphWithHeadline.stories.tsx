import React from "react";
import { Story, Meta } from "@storybook/react";
import ParagraphWithHeadline from "./ParagraphWithHeadline";

export default {
  title: "Prelems/Paragraph With Headline",
  component: ParagraphWithHeadline,
} as Meta;

const Template: Story = (args) => <ParagraphWithHeadline {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ParagraphWithHeadline.defaultProps.content,
  authoringHelper: ParagraphWithHeadline.defaultProps.authoringHelper,
  analytics: ParagraphWithHeadline.defaultProps.analytics,
};
