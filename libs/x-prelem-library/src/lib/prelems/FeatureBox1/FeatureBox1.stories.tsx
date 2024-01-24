import React from "react";
import { Story, Meta } from "@storybook/react";
import FeatureBox1 from "./FeatureBox1";

export default {
  title: "Prelems/FeatureBox",
  component: FeatureBox1,
} as Meta;

const Template: Story = (args) => <FeatureBox1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: FeatureBox1.defaultProps.content,
  authoringHelper: FeatureBox1.defaultProps.authoringHelper,
  analytics: FeatureBox1.defaultProps.analytics,
  secondaryArgs: FeatureBox1.defaultProps.secondaryArgs,
};
