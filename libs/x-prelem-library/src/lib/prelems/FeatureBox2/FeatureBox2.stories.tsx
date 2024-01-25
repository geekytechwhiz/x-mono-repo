import React from "react";
import { Story, Meta } from "@storybook/react";
import FeatureBox2 from "./FeatureBox2";

export default {
  title: "Prelems/FeatureBox",
  component: FeatureBox2,
} as Meta;

const Template: Story = (args) => <FeatureBox2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: FeatureBox2.defaultProps.content,
  authoringHelper: FeatureBox2.defaultProps.authoringHelper,
  analytics: FeatureBox2.defaultProps.analytics,
  secondaryArgs: FeatureBox2.defaultProps.secondaryArgs,
};
