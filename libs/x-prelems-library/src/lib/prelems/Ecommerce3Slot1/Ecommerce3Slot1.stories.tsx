import React from "react";
import { Story, Meta } from "@storybook/react";
import Ecommerce3Slot1 from "./Ecommerce3Slot1";

export default {
  title: "Prelems/Ecommerce3Slot1",
  component: Ecommerce3Slot1,
} as Meta;

const Template: Story = (args) => <Ecommerce3Slot1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Ecommerce3Slot1.defaultProps.content,
  authoringHelper: Ecommerce3Slot1.defaultProps.authoringHelper,
  analytics: Ecommerce3Slot1.defaultProps.analytics,
  secondaryArgs: Ecommerce3Slot1.defaultProps.secondaryArgs,
};
