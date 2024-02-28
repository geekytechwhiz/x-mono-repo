import React from "react";
import { Story, Meta } from "@storybook/react";
import TeamMembers from "./TeamMembers";

export default {
  title: "Prelems/Team Members",
  component: TeamMembers,
} as Meta;

const Template: Story = (args) => <TeamMembers {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: TeamMembers.defaultProps.content,
  authoringHelper: TeamMembers.defaultProps.authoringHelper,
  analytics: TeamMembers.defaultProps.analytics,
  secondaryArgs: TeamMembers.defaultProps.secondaryArgs,
};
