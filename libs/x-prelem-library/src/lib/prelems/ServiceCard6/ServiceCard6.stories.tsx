import React from "react";
import { Story, Meta } from "@storybook/react";
import ServiceCard6 from "./ServiceCard6";

export default {
  title: "Prelems/Service Card6",
  component: ServiceCard6,
} as Meta;

const Template: Story = (args) => <ServiceCard6 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ServiceCard6.defaultProps.content,
  authoringHelper: ServiceCard6.defaultProps.authoringHelper,
  analytics: ServiceCard6.defaultProps.analytics,
  secondaryArgs: ServiceCard6.defaultProps.secondaryArgs,
};
