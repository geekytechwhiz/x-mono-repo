import React from "react";
import { Story, Meta } from "@storybook/react";
import GallerySecond from "./GallerySecond";

export default {
  title: "Prelems/GallerySecond",
  component: GallerySecond,
} as Meta;

const Template: Story = (args) => <GallerySecond {...args} />;

export const Default = Template.bind({});
Default.args = {};
