import React from "react";
import { Story, Meta } from "@storybook/react";
import BlogTiles from "./BlogTiles";

export default {
  title: "Prelems/Blog Tiles",
  component: BlogTiles,
} as Meta;

const Template: Story = (args) => <BlogTiles {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: BlogTiles.defaultProps.content,
  authoringHelper: BlogTiles.defaultProps.authoringHelper,
  analytics: BlogTiles.defaultProps.analytics,
  secondaryArgs: BlogTiles.defaultProps.secondaryArgs,
};
