import React from "react";
import { Story, Meta } from "@storybook/react";
import LivestreamFeed from "./LivestreamFeed";

export default {
  title: "Prelems/Info Box",
  component: LivestreamFeed,
} as Meta;

const Template: Story = (args) => <LivestreamFeed {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: LivestreamFeed.defaultProps.content,
  authoringHelper: LivestreamFeed.defaultProps.authoringHelper,
  analytics: LivestreamFeed.defaultProps.analytics,
  secondaryArgs: LivestreamFeed.defaultProps.secondaryArgs,
};
