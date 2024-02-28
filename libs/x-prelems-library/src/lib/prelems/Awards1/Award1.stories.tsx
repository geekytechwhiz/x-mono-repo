import React from "react";
import { Story, Meta } from "@storybook/react";
import Awards1 from "./Awards1";

export default {
  title: "Prelems/Awards1",
  component: Awards1,
} as Meta;

const Template: Story = (args) => <Awards1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Awards1.defaultProps.content,
  authoringHelper: Awards1.defaultProps.authoringHelper,
  analytics: Awards1.defaultProps.analytics,
  secondaryArgs: Awards1.defaultProps.secondaryArgs,
};
