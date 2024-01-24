import React from "react";
import { Story, Meta } from "@storybook/react";
import ExpertiseShowcase from "./ExpertiseShowcase";

export default {
  title: "Prelems/Expertise Showcase",
  component: ExpertiseShowcase,
} as Meta;

const Template: Story = (args) => <ExpertiseShowcase {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ExpertiseShowcase.defaultProps.content,
  authoringHelper: ExpertiseShowcase.defaultProps.authoringHelper,
  analytics: ExpertiseShowcase.defaultProps.analytics,
  secondaryArgs: ExpertiseShowcase.defaultProps.secondaryArgs,
};
