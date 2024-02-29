import React from "react";
import { Story, Meta } from "@storybook/react";
import Gallery1 from "./Gallery1";

export default {
  title: "Prelems/Gallery1",
  component: Gallery1,
} as Meta;

const Template: Story = (args) => <Gallery1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Gallery1.defaultProps.content,
  authoringHelper: Gallery1.defaultProps.authoringHelper,
  analytics: Gallery1.defaultProps.analytics,
  secondaryArgs: Gallery1.defaultProps.secondaryArgs,
};
