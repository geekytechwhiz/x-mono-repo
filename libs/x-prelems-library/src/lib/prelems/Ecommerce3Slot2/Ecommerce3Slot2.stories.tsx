import React from "react";
import { Story, Meta } from "@storybook/react";
import Ecommerce3Slot2 from "./Ecommerce3Slot2";

export default {
  title: "Prelems/Ecommerce3Slot2",
  component: Ecommerce3Slot2,
} as Meta;

const Template: Story = (args) => <Ecommerce3Slot2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Ecommerce3Slot2.defaultProps.content,
  authoringHelper: Ecommerce3Slot2.defaultProps.authoringHelper,
  analytics: Ecommerce3Slot2.defaultProps.analytics,
  secondaryArgs: Ecommerce3Slot2.defaultProps.secondaryArgs,
};
