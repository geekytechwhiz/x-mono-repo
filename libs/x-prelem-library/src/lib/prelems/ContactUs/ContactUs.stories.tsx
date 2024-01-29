import React from "react";
import { Story, Meta } from "@storybook/react";
import ContactUs from "./ContactUs";

export default {
  title: "Prelems/About Us 2",
  component: ContactUs,
} as Meta;

const Template: Story = (args) => <ContactUs {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ContactUs.defaultProps.content,
  authoringHelper: ContactUs.defaultProps.authoringHelper,
  analytics: ContactUs.defaultProps.analytics,
  secondaryArgs: ContactUs.defaultProps.secondaryArgs,
};
