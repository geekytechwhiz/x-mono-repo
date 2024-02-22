import React from "react";
import { Story, Meta } from "@storybook/react";
import ServiceCard5 from "./ServiceCard5";

export default {
  title: "Prelems/Service Card5",
  component: ServiceCard5,
} as Meta;

const Template: Story = (args) => <ServiceCard5 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ServiceCard5.defaultProps.content,
  authoringHelper: ServiceCard5.defaultProps.authoringHelper,
  analytics: ServiceCard5.defaultProps.analytics,
  secondaryArgs: ServiceCard5.defaultProps.secondaryArgs,
};
