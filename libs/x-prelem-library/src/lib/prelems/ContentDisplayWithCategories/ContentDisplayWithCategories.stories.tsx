import React from "react";
import { Story, Meta } from "@storybook/react";
import ContentDisplayWithCategories from "./ContentDisplayWithCategories";

export default {
  title: "Prelems/Content Display With Categories",
  component: ContentDisplayWithCategories,
} as Meta;

const Template: Story = (args) => <ContentDisplayWithCategories {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ContentDisplayWithCategories.defaultProps.content,
  authoringHelper: ContentDisplayWithCategories.defaultProps.authoringHelper,
  analytics: ContentDisplayWithCategories.defaultProps.analytics,
  secondaryArgs: ContentDisplayWithCategories.defaultProps.secondaryArgs,
};
