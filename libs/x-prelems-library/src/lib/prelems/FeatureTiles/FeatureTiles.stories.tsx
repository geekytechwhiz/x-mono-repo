import React from "react";
import { Story, Meta } from "@storybook/react";
import FeatureTiles from "./FeatureTiles";

export default {
  title: "Prelems/FeatureTiles",
  component: FeatureTiles,
} as Meta;

const Template: Story = (args) => <FeatureTiles {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: FeatureTiles.defaultProps.content,
  authoringHelper: FeatureTiles.defaultProps.authoringHelper,
  analytics: FeatureTiles.defaultProps.analytics,
  secondaryArgs: FeatureTiles.defaultProps.secondaryArgs,
};
