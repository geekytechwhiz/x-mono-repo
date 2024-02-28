import React from "react";
import { Story, Meta } from "@storybook/react";
import WebsiteSummaryWithSubHeading from "./WebsiteSummaryWithSubHeading";

export default {
  title: "Prelems/Website Summary With SubHeading",
  component: WebsiteSummaryWithSubHeading,
} as Meta;

const Template: Story = (args) => <WebsiteSummaryWithSubHeading {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: WebsiteSummaryWithSubHeading.defaultProps.content,
  authoringHelper: WebsiteSummaryWithSubHeading.defaultProps.authoringHelper,
  analytics: WebsiteSummaryWithSubHeading.defaultProps.analytics,
  secondaryArgs: WebsiteSummaryWithSubHeading.defaultProps.secondaryArgs,
};
