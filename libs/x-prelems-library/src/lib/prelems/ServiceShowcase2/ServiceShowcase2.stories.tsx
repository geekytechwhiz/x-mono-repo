import React from "react";
import { Story, Meta } from "@storybook/react";
import ServiceShowcase2 from "./ServiceShowcase2";

export default {
  title: "Prelems/Service Showcase2",
  component: ServiceShowcase2,
} as Meta;

const Template: Story = (args) => <ServiceShowcase2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ServiceShowcase2.defaultProps.content,
  authoringHelper: ServiceShowcase2.defaultProps.authoringHelper,
  analytics: ServiceShowcase2.defaultProps.analytics,
  secondaryArgs: ServiceShowcase2.defaultProps.secondaryArgs,
};
