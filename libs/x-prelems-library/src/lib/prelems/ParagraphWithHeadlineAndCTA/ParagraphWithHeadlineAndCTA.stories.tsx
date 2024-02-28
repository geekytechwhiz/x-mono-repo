import React from "react";
import { Story, Meta } from "@storybook/react";
import ParagraphWithHeadlineAndCTA from "./ParagraphWithHeadlineAndCTA";

export default {
  title: "Prelems/Paragraph With Headline And CTA",
  component: ParagraphWithHeadlineAndCTA,
} as Meta;

const Template: Story = (args) => <ParagraphWithHeadlineAndCTA {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ParagraphWithHeadlineAndCTA.defaultProps.content,
  authoringHelper: ParagraphWithHeadlineAndCTA.defaultProps.authoringHelper,
  analytics: ParagraphWithHeadlineAndCTA.defaultProps.analytics,
};
