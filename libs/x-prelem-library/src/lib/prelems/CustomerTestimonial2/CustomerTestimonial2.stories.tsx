import React from "react";
import { Story, Meta } from "@storybook/react";
import CustomerTestimonial2 from "./CustomerTestimonial2";

export default {
  title: "Prelems/Customer Testimonial2",
  component: CustomerTestimonial2,
} as Meta;

const Template: Story = (args) => <CustomerTestimonial2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: CustomerTestimonial2.defaultProps.content,
  authoringHelper: CustomerTestimonial2.defaultProps.authoringHelper,
  analytics: CustomerTestimonial2.defaultProps.analytics,
  secondaryArgs: CustomerTestimonial2.defaultProps.secondaryArgs,
};
