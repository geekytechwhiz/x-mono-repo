import React from "react";
import { Story, Meta } from "@storybook/react";
import ServiceCard2 from "./ServiceCard2";

export default {
  title: "Prelems/Product Summary",
  component: ServiceCard2,
} as Meta;

const Template: Story = (args) => <ServiceCard2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ServiceCard2.defaultProps.content,
  authoringHelper: ServiceCard2.defaultProps.authoringHelper,
  analytics: ServiceCard2.defaultProps.analytics,
  secondaryArgs: ServiceCard2.defaultProps.secondaryArgs,
};
