import React from "react";
import { Story, Meta } from "@storybook/react";
import ServiceCard4 from "./ServiceCard4";

export default {
  title: "Prelems/Product Summary",
  component: ServiceCard4,
} as Meta;

const Template: Story = (args) => <ServiceCard4 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ServiceCard4.defaultProps.content,
  authoringHelper: ServiceCard4.defaultProps.authoringHelper,
  analytics: ServiceCard4.defaultProps.analytics,
  secondaryArgs: ServiceCard4.defaultProps.secondaryArgs,
};
