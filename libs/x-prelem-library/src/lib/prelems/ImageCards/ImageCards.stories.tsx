import React from "react";
import { Story, Meta } from "@storybook/react";
import ImageCards from "./ImageCards";

export default {
  title: "Prelems/ImageCards",
  component: ImageCards,
} as Meta;

const Template: Story = (args) => <ImageCards {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ImageCards.defaultProps.content,
  authoringHelper: ImageCards.defaultProps.authoringHelper,
  analytics: ImageCards.defaultProps.analytics,
  secondaryArgs: ImageCards.defaultProps.secondaryArgs,
};
