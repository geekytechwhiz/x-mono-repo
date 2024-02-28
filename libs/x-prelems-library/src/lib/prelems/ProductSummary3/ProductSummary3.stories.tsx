import React from "react";
import { Story, Meta } from "@storybook/react";
import ProductSummary3 from "./ProductSummary3";

export default {
  title: "Prelems/Product Summary3",
  component: ProductSummary3,
} as Meta;

const Template: Story = (args) => <ProductSummary3 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ProductSummary3.defaultProps.content,
  authoringHelper: ProductSummary3.defaultProps.authoringHelper,
  analytics: ProductSummary3.defaultProps.analytics,
  secondaryArgs: ProductSummary3.defaultProps.secondaryArgs,
};
