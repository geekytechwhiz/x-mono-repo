import React from "react";
import { Story, Meta } from "@storybook/react";
import AboutUsFourWithSubHeading from "./AboutUsFourWithSubHeading";

export default {
  title: "Prelems/About Us Four With Sub Heading",
  component: AboutUsFourWithSubHeading,
} as Meta;

const Template: Story = (args) => <AboutUsFourWithSubHeading {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: AboutUsFourWithSubHeading.defaultProps.content,
  authoringHelper: AboutUsFourWithSubHeading.defaultProps.authoringHelper,
  analytics: AboutUsFourWithSubHeading.defaultProps.analytics,
  secondaryArgs: AboutUsFourWithSubHeading.defaultProps.secondaryArgs,
};
