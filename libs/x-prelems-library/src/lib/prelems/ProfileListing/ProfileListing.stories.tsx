import React from "react";
import { Story, Meta } from "@storybook/react";
import ProfileListing from "./ProfileListing";

export default {
  title: "Prelems/Profile Listing",
  component: ProfileListing,
} as Meta;

const Template: Story = (args) => <ProfileListing {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ProfileListing.defaultProps.content,
  authoringHelper: ProfileListing.defaultProps.authoringHelper,
  analytics: ProfileListing.defaultProps.analytics,
  secondaryArgs: ProfileListing.defaultProps.secondaryArgs,
};
