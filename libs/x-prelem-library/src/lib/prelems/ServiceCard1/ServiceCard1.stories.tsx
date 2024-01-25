import React from "react";
import { Story, Meta } from "@storybook/react";
import ServiceCard1 from "./ServiceCard1";

export default {
  title: "Prelems/Product Summary",
  component: ServiceCard1,
} as Meta;

const Template: Story = (args) => <ServiceCard1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ServiceCard1.defaultProps.content,
  authoringHelper: ServiceCard1.defaultProps.authoringHelper,
  analytics: ServiceCard1.defaultProps.analytics,
  secondaryArgs: ServiceCard1.defaultProps.secondaryArgs,
};
