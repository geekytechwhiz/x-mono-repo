import React from "react";
import { Story, Meta } from "@storybook/react";
import Gallery2 from "./Gallery2";

export default {
  title: "Prelems/Gallery2",
  component: Gallery2,
} as Meta;

const Template: Story = (args) => <Gallery2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Gallery2.defaultProps.content,
  authoringHelper: Gallery2.defaultProps.authoringHelper,
  analytics: Gallery2.defaultProps.analytics,
  secondaryArgs: Gallery2.defaultProps.secondaryArgs,
};
