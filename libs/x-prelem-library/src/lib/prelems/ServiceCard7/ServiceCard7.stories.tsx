import React from "react";
import { Story, Meta } from "@storybook/react";
import ServiceCard7 from "./ServiceCard7";

export default {
  title: "Prelems/Service Card7",
  component: ServiceCard7,
} as Meta;

const Template: Story = (args) => <ServiceCard7 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ServiceCard7.defaultProps.content,
  authoringHelper: ServiceCard7.defaultProps.authoringHelper,
  analytics: ServiceCard7.defaultProps.analytics,
  secondaryArgs: ServiceCard7.defaultProps.secondaryArgs,
};
