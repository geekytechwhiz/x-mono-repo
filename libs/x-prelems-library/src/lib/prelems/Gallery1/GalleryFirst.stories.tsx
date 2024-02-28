import React from "react";
import { Story, Meta } from "@storybook/react";
import GalleryFirst from "./GalleryFirst";

export default {
  title: "Prelems/GalleryFirst",
  component: GalleryFirst,
} as Meta;

const Template: Story = (args) => <GalleryFirst {...args} />;

export const Default = Template.bind({});
Default.args = {};
