import React from "react";
import { Story, Meta } from "@storybook/react";
import Banner5 from "./Banner5";

export default {
  title: "Prelems/Banner5",
  component: Banner5,
} as Meta;

const Template: Story = (args) => <Banner5 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Banner5.defaultProps.content,
  authoringHelper: Banner5.defaultProps.authoringHelper,
  analytics: Banner5.defaultProps.analytics,
  secondaryArgs: Banner5.defaultProps.secondaryArgs,
};
