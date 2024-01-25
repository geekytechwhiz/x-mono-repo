import React from "react";
import { Story, Meta } from "@storybook/react";
import ServiceCard3 from "./ServiceCard3";

export default {
  title: "Prelems/Product Summary",
  component: ServiceCard3,
} as Meta;

const Template: Story = (args) => <ServiceCard3 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ServiceCard3.defaultProps.content,
  authoringHelper: ServiceCard3.defaultProps.authoringHelper,
  analytics: ServiceCard3.defaultProps.analytics,
  secondaryArgs: ServiceCard3.defaultProps.secondaryArgs,
};
