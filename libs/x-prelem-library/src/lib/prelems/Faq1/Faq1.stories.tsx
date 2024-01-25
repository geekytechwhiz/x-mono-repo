import React from "react";
import { Story, Meta } from "@storybook/react";
import FAQ1 from "./FAQ1";

export default {
  title: "Prelems/FAQ1",
  component: FAQ1,
} as Meta;

const Template: Story = (args) => <FAQ1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: FAQ1.defaultProps.content,
  authoringHelper: FAQ1.defaultProps.authoringHelper,
  analytics: FAQ1.defaultProps.analytics,
  secondaryArgs: FAQ1.defaultProps.secondaryArgs,
};
