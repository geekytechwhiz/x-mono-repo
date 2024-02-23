import React from "react";
import { Story, Meta } from "@storybook/react";
import SignBoard from "./SignBoard";

export default {
  title: "Prelems/About Us 2",
  component: SignBoard,
} as Meta;

const Template: Story = (args) => <SignBoard {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: SignBoard.defaultProps.content,
  authoringHelper: SignBoard.defaultProps.authoringHelper,
  analytics: SignBoard.defaultProps.analytics,
  secondaryArgs: SignBoard.defaultProps.secondaryArgs,
};
