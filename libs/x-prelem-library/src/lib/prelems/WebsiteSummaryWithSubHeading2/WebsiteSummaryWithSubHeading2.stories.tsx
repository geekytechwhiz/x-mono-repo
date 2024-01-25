import React from "react";
import { Story, Meta } from "@storybook/react";
import WebsiteSummaryWithSubHeading2 from "./WebsiteSummaryWithSubHeading2";

export default {
  title: "Prelems/Website Summary With SubHeading2",
  component: WebsiteSummaryWithSubHeading2,
} as Meta;

const Template: Story = (args) => <WebsiteSummaryWithSubHeading2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: WebsiteSummaryWithSubHeading2.defaultProps.content,
  authoringHelper: WebsiteSummaryWithSubHeading2.defaultProps.authoringHelper,
  analytics: WebsiteSummaryWithSubHeading2.defaultProps.analytics,
  secondaryArgs: WebsiteSummaryWithSubHeading2.defaultProps.secondaryArgs,
};
