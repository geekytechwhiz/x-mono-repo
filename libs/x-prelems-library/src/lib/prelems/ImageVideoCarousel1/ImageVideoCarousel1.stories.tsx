import React from "react";
import { Story, Meta } from "@storybook/react";
import ImageVideoCarousel1 from "./ImageVideoCarousel1";

export default {
  title: "Prelems/Image Video Carousel1",
  component: ImageVideoCarousel1,
} as Meta;

const Template: Story = (args) => <ImageVideoCarousel1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ImageVideoCarousel1.defaultProps.content,
  authoringHelper: ImageVideoCarousel1.defaultProps.authoringHelper,
  analytics: ImageVideoCarousel1.defaultProps.analytics,
  secondaryArgs: ImageVideoCarousel1.defaultProps.secondaryArgs,
};
